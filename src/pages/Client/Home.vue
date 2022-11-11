<template>
  <div>
    <vue-title title="GoGreen - Trái cây tươi"></vue-title>
    <el-carousel type="card" :interval="3000" style="width: 960px; margin: auto" :height="'270px'" indicator-position="outside">
      <el-carousel-item>
        <img style="width: 480px" src="../../../public/img/background-admin.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img style="width: 480px" src="../../../public/img/background-admin-2.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img style="width: 480px" src="../../../public/img/background-admin-3.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img style="width: 480px" src="../../../public/img/background-admin-4.jpg" alt="" />
      </el-carousel-item>
    </el-carousel>
    <el-card shadow="never">
      <span slot="header" style="font-weight: 600; font-size: 20px">Danh sách sản phẩm</span>
      <el-row :gutter="20">
        <el-col v-for="item in productList" :key="item.id" style="padding-bottom: 10px; padding-top: 10px" :xl="6" :lg="6" :md="8" :sm="12" :xs="12">
          <el-card shadow="hover" style="cursor: pointer" :body-style="{ padding: '15px' }" @click.native="showDetail(item)">
            <div style="height: 200px">
              <img style="width: 100%; max-height: 210px; margin: auto; display: block" :src="item.imgUrl" class="image"  alt="" />
            </div>
            <div style="margin-top: 15px">
              <span style="font-size: 18px;font-weight: 700">{{ item.productName }}</span>
              <div class="icon-discount">-{{ item.discount }}%</div>
              <div>
                <span style="font-weight: 600;color: red;">{{ formatCurrency(item.discountPrice) }}/{{ item.unit }}</span>
                <span style="margin-left: 15px; font-size: 14px; text-decoration: line-through;">{{ formatCurrency(item.unitPrice) }}/{{ item.unit }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
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
      isLoadingList: false
    }
  },
  mounted() {
    this.getListProduct()
  },
  methods: {
    getListProduct() {
      this.isLoadingList = true
      ApiFactory.callAPI(ConstantAPI['PRODUCT'].GET, {}, '').then(rs => {
        this.productList = rs.slice(0, 9);
      }).catch(err => {
        errAlert(this, 'Lỗi khi lấy danh sách sản phẩm')
      })
    },
    showDetail(item) {
      this.$router.push({
        name: 'product',
        params: item
      })
    },
    formatCurrency
  }
}
</script>
