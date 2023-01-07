<template>
  <div class="content">
    <div class="container-fluid">
      <el-card :header="'Danh sách đơn hàng'">
<!--        <el-button type="success" style="margin-bottom: 20px; outline: none" icon="el-icon-plus" @click="showDialog(FORM_MODE.CREATE)">-->
<!--          Thêm mới sản phẩm-->
<!--        </el-button>-->
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
            :index="(i) => {return ((currentPage >= 1 ? currentPage - 1 : 0) * pageSize) + i + 1}">
          </el-table-column>
          <el-table-column
            prop="fullName"
            label="Tên khách hàng"
            header-align="center"
            width="200"
            :show-overflow-tooltip="true"
            :formatter="(row, col, val) => row.customerInfo.fullName">
          </el-table-column>
          <el-table-column
            prop="shippingAddress"
            label="Địa chỉ"
            header-align="center"
            width="260"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="number"
            label="Số điện thoại"
            header-align="center"
            width="180"
            :show-overflow-tooltip="true"
            :formatter="(row, col, val) => row.customerInfo.phoneNumber">
          </el-table-column>
          <el-table-column
            prop="email"
            label="Email"
            header-align="center"
            width="250"
            :show-overflow-tooltip="true"
            :formatter="(row, col, val) => row.customerInfo.email">
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            label="Trạng thái đơn hàng"
            header-align="center"
            width="300"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="Tổng tiền"
            header-align="center"
            width="180"
            :show-overflow-tooltip="true"
            :formatter="(row, col, val) => formatCurrencyFunction(val)">
          </el-table-column>
          <el-table-column
            label="Thao tác"
            header-align="center"
            width="100"
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
            </template>
          </el-table-column>
        </el-table>
        <dialog-product
          :is-show-dialog.sync="isShowDialog"
          :detail.sync="productDetail"
          :title="dialogTitle"
          @close-dialog="onCloseDialog"
        />
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
  font-size: 22px
}
</style>
<script>
import LTable from '@/components/Table.vue'
import Card from '@/components/Cards/Card.vue'
import DialogProduct from "./OrderDialog";
import {FORM_MODE} from "@/utils/Constant";
import {formatCurrency} from "@/utils/Fomatter";
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import {errAlert} from "@/utils/Alert";

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
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50, 100],
      total: 0,
      tableData: [],
      tableDataAll: [],
      isLoadingTable: true,
    }
  },
  mounted() {
    this.getListOrders()
  },
  methods: {
    getListOrders() {
      this.isLoadingTable = true
      ApiFactory.callAPI(ConstantAPI['ORDER'].SEARCH, {}, {}).then(rs => {
        this.tableDataAll = rs.response_data.data
        this.handleCurrentChange(1)
        this.pageSize = 10
        this.total = rs.response_data.total_element
        this.isLoadingTable = false
      }).catch(err => {
        errAlert(this, 'Lỗi khi lấy danh sách đơn hàng')
      })
    },
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
