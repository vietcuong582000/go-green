<template>
  <el-dialog
    :title="'THÊM MỚI ĐƠN HÀNG'"
    :visible.sync="isShowDialogCreate"
    width="90%"
    :close-on-click-modal="false"
    @close="close">
    <el-card shadow="never">
      <el-form ref="form" :model="form" label-width="160px" label-position="left">
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Họ và tên" prop="fullName">
              <el-input
                v-model="form.fullName"
                placeholder="Họ và tên"
                maxlength="100"
                :show-word-limit="true"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Địa chỉ" prop="shippingAddress">
              <el-input
                v-model="form.shippingAddress"
                placeholder="Địa chỉ"
                maxlength="255"
                :show-word-limit="true"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Số điện thoại" prop="customerNumber">
              <el-input
                v-model="form.customerNumber"
                placeholder="Số điện thoại"
                maxlength="10"
                :show-word-limit="true"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Email" prop="customerEmail">
              <el-input
                v-model="form.customerEmail"
                placeholder="Email"
                maxlength="100"
                :show-word-limit="true"
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button type="success" size="mini" style="margin-bottom: 20px; outline: none" icon="el-icon-plus" @click="showDialogAddProduct()">
              Thêm sản phẩm
            </el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
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
              prop="discountedPrice"
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
              :show-overflow-tooltip="true">
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
    <add-product
      :is-show-dialog-add-product.sync="isShowDialogAddProduct"
      @add-product="onAddProduct($event)"
    />
  </el-dialog>
</template>

<script>
import MoneyInput from "../../components/Inputs/MoneyInput";
import {formatCurrency, formatDate} from "@/utils/Fomatter";
import {PAYMENT_METHOD} from "@/utils/Constant";
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import AddProduct from "@/pages/Orders/AddProduct";
import {errAlert, showAlert, SUCCESS} from "@/utils/Alert";

export default {
  components: {
    MoneyInput,
    AddProduct
  },
  props: {
    isShowDialogCreate: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      form: {...FORM_DEFAULT},
      tableData: [],
      listOrderStatus: [],
      isShowDialogAddProduct: false,
      PAYMENT_METHOD
    };
  },
  watch: {},
  computed: {
    totalPrice() {
      const tongTien = this.tableData.reduce((acc, cur) => {
        return acc + (cur.discountedPrice * cur.quantityOrder)
      }, 0)
      return tongTien
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
      let orderDetails = []
      orderDetails = this.tableData
      this.payload = {
        "shippingAddress": this.form.shippingAddress,
        "paymentMethod": 'COD',
        "orderStatus": this.form.orderStatus,
        "customerInfo": {
          "fullName": this.form.fullName,
          "phoneNumber": this.form.customerNumber,
          "email": this.form.customerEmail
        },
        "orderDetails": orderDetails
      }
      ApiFactory.callAPI(ConstantAPI['ORDER'].CREATE, this.payload, {}).then(rs => {
        this.$notify({
          title: 'Tạo đơn hàng thành công',
          dangerouslyUseHTMLString: true,
          message: 'Đơn hàng đã được tạo thành công',
          type: 'success'
        })
        this.close()
        this.$emit('save-success')
      }).catch(err => {
        errAlert(this, 'Có lỗi xảy ra')
      })
    },
    showDialogAddProduct() {
      this.isShowDialogAddProduct = true
    },
    onAddProduct(val) {
      console.log(val)
      val.forEach(item => {
        item.productId = item.id
        item.quantityOrder = 1
        item.subTotal = this.formatCurrencyFunction(item.discountedPrice * item.quantityOrder)
        this.tableData.push(item)
      })
      this.tableData = [ ...this.tableData, {
        productName: 'Tổng tiền',
        price: '',
        subTotal: this.formatCurrencyFunction(this.totalPrice)
      }]
      console.log(this.tableData)
    },
    clearForm() {
      this.form = {...FORM_DEFAULT}
      this.tableData = []
    },
    close() {
      this.clearForm()
      this.$emit('update:isShowDialogCreate')
      this.$emit('close-dialog')
    },
    formatCurrencyFunction(number) {
      return formatCurrency(number)
    },
    formatDate
  }
};
const FORM_DEFAULT = {
  form: {
    fullName: '',
    shippingAddress: '',
    customerNumber: '',
    customerEmail: '',
    paymentMethod: 'COD',
  },
}
</script>
