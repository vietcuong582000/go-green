<template>
  <div class="content">
    <div class="container-fluid">
      <el-card :header="'Danh sách sản phẩm'">
        <el-button type="success" style="margin-bottom: 20px; outline: none" icon="el-icon-plus" @click="showDialog(FORM_MODE.CREATE)">
          Thêm mới sản phẩm
        </el-button>
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="stt"
            label="STT"
            width="75"
            header-align="center"
            align="center"
            type="index"
            :index="(i) => {return ((page >= 1 ? page - 1 : 0) * size) + i + 1}">
          </el-table-column>
          <el-table-column
            prop="productId"
            label="Mã sản phẩm"
            header-align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="Tên sản phẩm"
            header-align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="productCategory"
            label="Danh mục"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="Đơn giá"
            header-align="center"
            :formatter="(row, col, val) => formatCurrencyFunction(val)"
          >
          </el-table-column>
          <el-table-column
            prop="productQuantity"
            label="Số lượng"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="productDescription"
            label="Mô tả"
            header-align="center">
          </el-table-column>
          <el-table-column
            label="Thao tác"
            header-align="center"
            width="100"
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
            </template>
          </el-table-column>
        </el-table>
        <dialog-product
          :is-show-dialog.sync="isShowDialog"
          :detail.sync="productDetail"
          :title="dialogTitle"
          @close-dialog="onCloseDialog"
        />

        <!--        <el-pagination-->
        <!--          :current-page.sync="currentPage"-->
        <!--          :layout="'total, sizes, prev, pager, next, jumper'"-->
        <!--          :page-size.sync="pageSize"-->
        <!--          :page-sizes="pageSizes"-->
        <!--          :total="total"-->
        <!--          @size-change="handleSizeChange"-->
        <!--          @current-change="handleCurrentChange"-->
        <!--        />-->
      </el-card>
    </div>
  </div>
</template>
<style scoped>
>>> .el-card__header {
  font-size: 22px
}
</style>
<script>
import LTable from '@/components/Table.vue'
import Card from '@/components/Cards/Card.vue'
import DialogProduct from "./OrderDialog";
import {FORM_MODE} from "@/utils/Constant";
import {formatCurrency} from "@/utils/Fomatter";

export default {
  components: {
    LTable,
    Card,
    DialogProduct
  },
  data () {
    return {
      productDetail: {},
      dialogTitle: '',
      isShowDialog: false,
      FORM_MODE,
      page: 1,
      size: 20,
      tableData: [{
        productId: 'Apple01',
        productName: 'Táo Niu Zee Lân',
        productCategory: 'Trái cây',
        productPrice: '30000',
        productQuantity: '100',
        productDescription: 'Táo nhập khẩu từ Niu Zee Lân',
      }, {
        productId: 'Grape01',
        productName: 'Nho Mỹ (Đình)',
        productCategory: 'Trái cây',
        productPrice: '100000',
        productQuantity: '200',
        productDescription: 'Nho Mỹ nhập khẩu',
      }, {
        productId: 'Mango01',
        productName: 'Xoài Úc',
        productCategory: 'Trái cây',
        productPrice: '40000',
        productQuantity: '100',
        productDescription: 'Xoài Úc nhập khẩu',
      }]
    }
  },
  methods: {
    showDialog(formMode, row) {
      this.isShowDialog = true
      if(formMode === FORM_MODE.EDIT) {
        this.productDetail = row
        this.dialogTitle = `SỬA THÔNG TIN SẢN PHẨM`
      } else {
        this.dialogTitle = `THÊM MỚI SẢN PHẨM`
      }
    },
    onCloseDialog() {
      this.productDetail = {}
    },
    formatCurrencyFunction(number) {
      return formatCurrency(number)
    }
  }
}
</script>
<style>
</style>
