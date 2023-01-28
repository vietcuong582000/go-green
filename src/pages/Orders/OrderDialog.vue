<template>
  <el-dialog
    :title="'SỬA THÔNG TIN SẢN PHẨM'"
    :visible.sync="isShowDialog"
    width="80%"
    :close-on-click-modal="false"
    @close="close">
    <el-card shadow="never">
      <el-form ref="form" :model="form" label-width="160px" label-position="left">
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Tên khách hàng">
              <span>{{ form.customerInfo ? form.customerInfo.fullName : '' }}</span>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Địa chỉ">
              <span>{{ form.shippingAddress }}</span>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Số điện thoại">
              <span>{{ form.customerInfo ? form.customerInfo.phoneNumber : '' }}</span>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Email">
              <span>{{ form.customerInfo ? form.customerInfo.email : '' }}</span>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Ngày tạo">
              <span>{{ formatDate(form.createdDate) }}</span>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Hình thức thanh toán">
              <span>{{ PAYMENT_METHOD[form.paymentMethod] }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%">
<!--            <el-table-column-->
<!--              prop="stt"-->
<!--              label="STT"-->
<!--              width="75"-->
<!--              header-align="center"-->
<!--              align="center"-->
<!--              type="index"-->
<!--              :index="(i) => {return ((currentPage >= 1 ? currentPage - 1 : 0) * pageSize) + i + 1}">-->
<!--            </el-table-column>-->
            <el-table-column
              prop="productName"
              label="Tên sản phẩm"
              header-align="center"
              min-width="200"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="productCode"
              label="Mã sản phẩm"
              header-align="center"
              width="260"
              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              prop="quantityOrder"
              label="Số lượng"
              header-align="center"
              width="180"
              :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              prop="price"
              label="Đơn giá"
              header-align="center"
              width="250"
              :show-overflow-tooltip="true"
              :formatter="(row, col, val) => val ? formatCurrencyFunction(val) : ''">
            </el-table-column>
            <el-table-column
              prop="subTotal"
              label="Tổng tiền"
              header-align="center"
              width="300"
              :show-overflow-tooltip="true"
              :formatter="(row, col, val) => formatCurrencyFunction(val)">
            </el-table-column>
          </el-table>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Trạng thái đơn hàng" label-width="150px">
              <el-select style="width: 100%" v-model="form.orderStatus" placeholder="Trạng thái đơn hàng">
                <el-option
                  v-for="item in listOrderStatus"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <span slot="footer">
      <el-button type="success" @click="onSave">Lưu</el-button>
      <el-button @click="close">Đóng</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MoneyInput from "../../components/Inputs/MoneyInput";
import {formatCurrency, formatDate} from "@/utils/Fomatter";
import {PAYMENT_METHOD} from "@/utils/Constant";
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import {errAlert, showAlert, SUCCESS} from "@/utils/Alert";

export default {
  components: {
    MoneyInput
  },
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {...FORM_DEFAULT},
      tableData: [],
      dialogVisible: false,
      listOrderStatus: [],
      PAYMENT_METHOD
    };
  },
  watch: {
    isShowDialog() {
      this.form = { ...this.detail }
      this.tableData = [ ...this.form.orderDetails, {
        productName: 'Tổng tiền',
        price: '',
        subTotal: this.formatCurrencyFunction(this.form.totalPrice)
      }]
    }
  },
  mounted() {
    this.getListOrderStatus()
  },
  methods: {
    getListOrderStatus() {
      ApiFactory.callAPI(ConstantAPI['ORDER'].SEARCH_LIST_STATUS, {}, {}).then(rs => {
        const listResponse = Object.keys(rs.response_data).map(function(key) {
          return {key: key, label: rs.response_data[key]};
        });
        this.listOrderStatus = listResponse
      }).catch(err => {
        errAlert(this, 'Lỗi khi lấy danh sách trạng thái đơn hàng')
      })
    },
    onSave() {
      ApiFactory.callAPI(ConstantAPI['ORDER'].CREATE, this.form, {}).then(rs => {
        showAlert(this, SUCCESS, 'Đơn hàng đã được thay đổi thông tin thành công')
        this.close()
        this.$emit('save-success')
      }).catch(err => {
        errAlert(this, 'Có lỗi xảy ra')
      })
    },
    clearForm() {
      this.form = {...FORM_DEFAULT}
    },
    close() {
      this.clearForm()
      this.$emit('update:isShowDialog')
      this.$emit('close-dialog')
    },
    formatCurrencyFunction(number) {
      return formatCurrency(number)
    },
    formatDate
  }
};
const FORM_DEFAULT = {
  customerInfo: {},
  orderDetails: [],
  shippingAddress: '',
  orderStatus: '',
  totalPrice: ''
}
</script>
