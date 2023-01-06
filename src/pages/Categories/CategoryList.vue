<template>
  <div class="content">
    <vue-title title="GoGreen - Danh mục sản phẩm"></vue-title>
    <div class="container-fluid">
      <el-card :header="'DANH MỤC SẢN PHẨM'">
        <el-button type="success" style="margin-bottom: 20px; outline: none" icon="el-icon-plus" @click="showDialog(FORM_MODE.CREATE)">
          Thêm mới danh mục
        </el-button>
        <el-table
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
            prop="code"
            label="Mã danh mục"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="Tên danh mục"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="Thao tác"
            header-align="center"
            width="200"
            align="center"
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
          @on-success="getListCategory"
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
import DialogProduct from "./CategoryDialog";
import {FORM_MODE} from "@/utils/Constant";
import {formatCurrency} from "@/utils/Fomatter";
import VueTitle from "@/components/VueTitle";
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import {errAlert} from "@/utils/Alert";

const FUNCTION_CODE = 'CATEGORY'
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
      FORM_MODE,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50, 100],
      total: 0,
      tableData: [],
      tableDataAll: [],
      isLoadingTable: true,
      formMode: null
    }
  },
  mounted() {
    this.getListCategory()
  },
  methods: {
    getListCategory() {
      this.isLoadingTable = true
      ApiFactory.callAPI(ConstantAPI[FUNCTION_CODE].GET, {}, '').then(rs => {
        this.tableDataAll = rs.response_data.data
        this.handleCurrentChange(1)
        this.pageSize = 10
        this.total = rs.response_data.total_element
        this.isLoadingTable = false
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
          this.dialogTitle = 'THÊM MỚI DANH MỤC'
          break
        case FORM_MODE.EDIT:
          this.dialogTitle = 'SỬA THÔNG TIN DANH MỤC'
          break
        case FORM_MODE.DELETE:
          this.dialogTitle = 'XÓA DANH MỤC'
          break
      }
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
    }
  }
}
</script>
<style>
</style>
