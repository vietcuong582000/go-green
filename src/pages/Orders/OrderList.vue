<template>
  <div class="content">
    <div class="container-fluid">
      <el-card :header="'Danh sách đơn hàng'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button type="success" style="margin-bottom: 20px; outline: none" icon="el-icon-plus" @click="showDialogCreate()">
              Thêm mới đơn hàng
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-input
              v-model="keywordSearch"
              placeholder="Tìm kiếm sản phẩm"
              maxlength="225"
              @input="searchCategory"
            >
              <i class="el-icon-search el-input__icon" slot="prefix">
              </i>
            </el-input>
          </el-col>
        </el-row>
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
            prop="createdDate"
            label="Ngày tạo"
            header-align="center"
            width="180"
            :show-overflow-tooltip="true"
            align="center"
            sortable
            :formatter="(row, col, val) => formatDate(val)">
          </el-table-column>
          <el-table-column
            prop="paymentMethod"
            label="Hình thức thanh toán"
            header-align="center"
            width="180"
            :show-overflow-tooltip="true"
            :formatter="(row, col, val) => PAYMENT_METHOD[val]"
          >
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
              <el-tooltip :content="'Xem chi tiết'" :open-delay="200" placement="top" effect="light">
                <el-button
                  type="success"
                  size="small"
                  style="outline: none"
                  icon="el-icon-view"
                  circle
                  plain
                  @click="showDialog(row)"
                >
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <dialog-order
          :is-show-dialog.sync="isShowDialog"
          :detail.sync="orderDetail"
          @close-dialog="onCloseDialog"
          @save-success="getListOrders"
        />
        <order-create
          :is-show-dialog-create.sync="isShowDialogCreate"
          @close-dialog="onCloseDialog"
          @save-success="getListOrders"
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
import DialogOrder from "./OrderDialog";
import OrderCreate from "@/pages/Orders/OrderCreate";
import {FORM_MODE, PAYMENT_METHOD} from "@/utils/Constant";
import {formatCurrency, formatDate} from "@/utils/Fomatter";
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import {errAlert} from "@/utils/Alert";

export default {
  components: {
    LTable,
    Card,
    DialogOrder,
    OrderCreate
  },
  data () {
    return {
      orderDetail: {},
      isShowDialog: false,
      isShowDialogCreate: false,
      FORM_MODE,
      PAYMENT_METHOD,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50, 100],
      total: 0,
      tableData: [],
      tableDataAll: [],
      isLoadingTable: true,
      keywordSearch: ''
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
    showDialog(row) {
      this.isShowDialog = true
      this.orderDetail = row
    },
    showDialogCreate() {
      this.isShowDialogCreate = true
    },
    onCloseDialog() {
      this.orderDetail = {}
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
    searchCategory() {

    },
    formatDate
  }
}
</script>
<style>
</style>
