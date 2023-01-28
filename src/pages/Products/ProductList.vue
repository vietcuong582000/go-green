<template>
  <div class="content">
    <vue-title title="GoGreen - Quản lý sản phẩm"></vue-title>
    <div class="container-fluid">
      <el-card :header="'DANH SÁCH SẢN PHẨM'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button type="success" style="margin-bottom: 20px; outline: none" icon="el-icon-plus" @click="showDialog(FORM_MODE.CREATE)">
              Thêm mới sản phẩm
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-select
              :disabled="formMode === FORM_MODE.DELETE"
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
        </el-row>
        <el-table
          v-loading="isLoadingTable"
          :data="tableData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="stt"
            label="STT"
            width="50"
            header-align="center"
            align="center"
            type="index"
            :index="(i) => {return ((currentPage >= 1 ? currentPage - 1 : 0) * pageSize) + i + 1}"/>
          <el-table-column
            prop="productCode"
            label="Mã sản phẩm"
            header-align="center"
            :show-overflow-tooltip="true"
            width="150"
          />
          <el-table-column
            prop="productName"
            label="Tên sản phẩm"
            header-align="center"
            :show-overflow-tooltip="true"
            width="170"
          />
          <el-table-column
            prop="productName"
            label="Ảnh sản phẩm"
            header-align="center"
            :show-overflow-tooltip="true"
            align="center"
            width="150"
          >
            <template slot-scope="{row}">
              <img :src="row.imgUrl"  alt="" style="max-width: 150px; height: 50px"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="categories"
            label="Danh mục"
            :show-overflow-tooltip="true"
            header-align="center"
            width="120"
            :formatter="(row, col, val) => formatCategory(val)"
          />
          <el-table-column
            prop="unitPrice"
            label="Đơn giá"
            header-align="center"
            :show-overflow-tooltip="true"
            :formatter="(row, col, val) => formatCurrencyFunction(val)"
            width="100"
          />
          <el-table-column
            prop="unit"
            label="Đơn vị"
            header-align="center"
            :show-overflow-tooltip="true"
            width="100"
          />
          <el-table-column
            prop="quantity"
            label="Số lượng"
            :show-overflow-tooltip="true"
            header-align="center"
            width="100"
          />
          <el-table-column
            prop="importDate"
            label="Ngày nhập"
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            sortable
            :formatter="(row, col, val) => formatDate(val)"
            width="150"
          />
          <el-table-column
            prop="expirationDate"
            label="Ngày hết hạn"
            :show-overflow-tooltip="true"
            header-align="center"
            align="center"
            sortable
            :formatter="(row, col, val) => formatDate(val)"
            width="150"
          />
          <el-table-column
            prop="description"
            label="Mô tả"
            :show-overflow-tooltip="true"
            header-align="center"
            width="200"
          />
          <el-table-column
            label="Thao tác"
            header-align="center"
            width="100"
            :show-overflow-tooltip="true"
            align="center"
            fixed="right"
          >
            <template slot-scope="{row}">
              <el-tooltip :content="'Sửa'" :open-delay="200" placement="top" effect="light">
                <el-button
                  type="success"
                  size="small"
                  style="outline: none"
                  icon="el-icon-edit"
                  circle
                  plain
                  @click="showDialog(FORM_MODE.EDIT, row)"
                >
                </el-button>
              </el-tooltip>
              <el-tooltip :content="'Xóa'" :open-delay="200" placement="top" effect="light">
                <el-button
                  type="danger"
                  size="small"
                  style="outline: none"
                  icon="el-icon-delete"
                  circle
                  plain
                  @click="showDialog(FORM_MODE.DELETE, row)"
                >
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <dialog-product
          :is-show-dialog.sync="isShowDialog"
          :detail.sync="productDetail"
          :title="dialogTitle"
          :form-mode="formMode"
          @close-dialog="onCloseDialog"
          @on-success="getListProduct"
        />
        <div style="height: 20px"></div>
        <el-pagination
          :current-page.sync="currentPage"
          :layout="'total, sizes, prev, pager, next, jumper'"
          :page-size.sync="pageSize"
          :page-sizes="pageSizes"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-card>
    </div>
  </div>
</template>
<style scoped>
>>> .el-card__header {
  font-size: 20px
}
</style>
<script>
  import LTable from '@/components/Table.vue'
  import Card from '@/components/Cards/Card.vue'
  import DialogProduct from "./ProductDialog";
  import {FORM_MODE} from "@/utils/Constant";
  import {formatCurrency, formatDate} from "@/utils/Fomatter";
  import ApiFactory from "@/utils/apiFactory";
  import {ConstantAPI} from "@/utils/ConstantAPI";
  import {errAlert} from "@/utils/Alert";
  import VueTitle from '@/components/VueTitle'
  const FUNCTION_CODE = 'PRODUCT'
  export default {
    components: {
      LTable,
      Card,
      DialogProduct,
      VueTitle
    },
    data () {
      return {
        productDetail: {},
        dialogTitle: '',
        isShowDialog: false,
        formMode: null,
        FORM_MODE,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 20, 50, 100],
        total: 0,
        tableData: [],
        tableDataAll: [],
        isLoadingTable: true,
        keywordSearch: '',
        keywordCategory: '',
        listDanhMuc: [],
        timeout: null,
      }
    },
    mounted() {
      this.getListProduct()
      this.getListCategory()
    },
    methods: {
      getListProduct() {
        this.isLoadingTable = true
        const param = {}
        if (this.keywordSearch) {
          param.keyword = this.keywordSearch
        }
        if (this.keywordCategory) {
          param.categoryId = this.keywordCategory
        }
        ApiFactory.callAPI(ConstantAPI[FUNCTION_CODE].GET_LIST_WITH_KEY_AND_CATEGORY, {}, param).then(rs => {
          this.tableDataAll = rs.response_data.data
          this.handleCurrentChange(1)
          this.pageSize = 10
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
      showDialog(formMode, row) {
        this.isShowDialog = true
        this.formMode = formMode
        this.productDetail = {...row}
        switch (formMode) {
          case FORM_MODE.CREATE:
            this.dialogTitle = 'THÊM MỚI SẢN PHẨM'
            break
          case FORM_MODE.EDIT:
            this.dialogTitle = 'SỬA THÔNG TIN SẢN PHẨM'
            break
          case FORM_MODE.DELETE:
            this.dialogTitle = 'XÓA SẢN PHẨM'
            break
        }
      },
      searchProduct() {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.getListProduct()
        }, 300)
      },
      onCloseDialog() {
        this.productDetail = {}
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.tableData = this.tableDataAll.slice((val-1) * this.pageSize, (val-1) * this.pageSize + this.pageSize)
        scrollTo(0, 800)
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.handleCurrentChange(1)
      },
      formatCurrencyFunction(number) {
        return formatCurrency(number)
      },
      formatCategory(row, col, val) {
        return row.map(item => item.name).join()
      },
      formatDate
    }
  }
</script>
<style>
</style>
