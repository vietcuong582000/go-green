<template>
  <div>
    <vue-title title="GoGreen - Danh sách sản phẩm"></vue-title>
    <el-card shadow="never">
      <span slot="header" style="font-weight: 600; font-size: 20px">Danh sách sản phẩm</span>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            v-model="keywordSearch"
            placeholder="Tìm kiếm sản phẩm"
            maxlength="225"
            @input="searchProduct"
          >
            <i class="el-icon-search el-input__icon" slot="prefix">
            </i>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="keywordCategory"
            placeholder="Danh mục"
            style="width: 100%"
            @change="getListProduct()"
          >
            <el-option
              v-for="item in listDanhMuc"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <div v-if="productList.length > 0">
          <el-col v-for="item in productList" :key="item.id" style="padding-bottom: 10px; padding-top: 10px" :xl="6" :lg="6" :md="8" :sm="12" :xs="12">
            <el-card shadow="hover" style="cursor: pointer" :body-style="{ padding: '15px' }" @click.native="showDetail(item)">
              <div style="height: 200px">
                <img style="width: 100%; max-height: 210px; margin: auto; display: block" :src="item.imgUrl" class="image"  alt="" />
              </div>
              <div style="margin-top: 15px">
                <span style="font-size: 18px;font-weight: 700">{{ item.productName }}</span>
                <div v-if="item.discount > 0" class="icon-discount">-{{ item.discount }}%</div>
                <div>
                  <span style="font-weight: 600;color: red;">{{ formatCurrency(item.discountedPrice) }}/{{ item.unit }}</span>
                  <span v-if="item.discount > 0" style="margin-left: 15px; font-size: 14px; text-decoration: line-through;">{{ formatCurrency(item.unitPrice) }}/{{ item.unit }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </div>
        <div v-else style="margin: 20px;text-align: center;">Không có sản phẩm nào</div>
      </el-row>
    </el-card>
    <div style="height: 20px"></div>
    <el-pagination
      style="text-align: center;"
      :current-page.sync="currentPage"
      background
      layout="prev, pager, next"
      :page-size.sync="pageSize"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.icon-discount{
  display: inline-block;
  background-color: red;
  border-radius: 50%;
  padding: 5px;
  margin-left: 15px;
  color: #FFFFFF;
  font-weight: 600;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
<script>
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import {errAlert} from "@/utils/Alert";
import {formatCurrency} from "@/utils/Fomatter";
import VueTitle from "@/components/VueTitle";

export default {
  components: {
    VueTitle
  },
  data() {
    return {
      productList: [],
      productListAll: [],
      total: 0,
      currentPage: 1,
      pageSize: 12,
      isLoadingList: false,
      keywordSearch: '',
      keywordCategory: '',
      listDanhMuc: [],
    }
  },
  mounted() {
    this.getListProduct()
    this.getListCategory()
  },
  methods: {
    getListProduct() {
      this.isLoadingList = true
      const param = {}
      if (this.keywordSearch) {
        param.keyword = this.keywordSearch
      }
      if (this.keywordCategory) {
        param.categoryId = this.keywordCategory
      }
      ApiFactory.callAPI(ConstantAPI['PRODUCT'].GET_HOME, {}, param).then(rs => {
        this.productListAll = rs.response_data.data
        this.handleCurrentChange(1)
        this.total = rs.response_data.total_element
        this.isLoadingTable = false
      }).catch(err => {
        errAlert(this, 'Lỗi khi lấy danh sách sản phẩm')
      })
    },
    getListCategory() {
      ApiFactory.callAPI(ConstantAPI['CATEGORY'].GET, {}, '').then(rs => {
        this.listDanhMuc = rs.response_data.data
        this.listDanhMuc.unshift({ id: '', name: "Tất cả" })
      }).catch(err => {
        errAlert(this, 'Lỗi khi lấy danh mục sản phẩm')
      })
    },
    showDetail(item) {
      this.$router.push({
        name: 'product',
        params: { id: item.id }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.productList = this.productListAll.slice((val-1) * this.pageSize, (val-1) * this.pageSize + this.pageSize)
      scrollTo(0, 800)
    },
    searchProduct() {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.getListProduct()
      }, 300)
    },
    formatCurrency
  }
}
</script>
