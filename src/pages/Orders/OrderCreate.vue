<template>
  <el-dialog
    :title="'THÊM MỚI ĐƠN HÀNG'"
    :visible.sync="isShowDialogCreate"
    width="90%"
    :close-on-click-modal="false"
    @close="close">
    <el-card shadow="never">
      <el-form ref="form" :model="form" :rules="rules" label-width="160px" label-position="left">
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
            <el-table-column
              prop="stt"
              label="STT"
              width="75"
              header-align="center"
              align="center"
              type="index"
              :index="(i) => {return i + 1}">
            </el-table-column>
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
              prop="quantityOrderClone"
              label="Số lượng"
              header-align="center"
              width="180"
              :show-overflow-tooltip="true">
              <template slot-scope="{row}">
                <el-input
                  v-if="!row.notShowInputQuantity"
                  v-model="row.quantityOrder"
                  style="width: 80px"
                  placeholder="Số lượng"
                  maxlength="5"
                  type="number"
                  size="mini"
                  :show-word-limit="true"
                  @input="onChangeQuantity(row)"
                />
              </template>
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
            <el-table-column
              label="Thao tác"
              header-align="center"
              width="90"
              :show-overflow-tooltip="true"
              align="center"
            >
              <template slot-scope="{row, $index}">
                <el-tooltip :content="'Xóa'" :open-delay="200" placement="top" effect="light">
                  <el-button
                    v-if="!row.notShowInputQuantity"
                    type="danger"
                    size="small"
                    style="outline: none"
                    icon="el-icon-delete"
                    circle
                    plain
                    @click="onDelete($index, row)"
                  >
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Trạng thái đơn hàng" prop="orderStatus" label-width="160px">
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
      <el-button type="success" @click="onConfirmSave">Lưu</el-button>
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
import {emailRule, phoneRule, requiredRule} from "@/utils/Validate";

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
      rules: {
        fullName: requiredRule('Họ và tên'),
        shippingAddress: requiredRule('Địa chỉ'),
        customerNumber: [requiredRule('Số điện thoại'), phoneRule('Số điện thoại')],
        customerEmail: [requiredRule('Email'), emailRule('Email')],
        orderStatus: requiredRule('Trạng thái đơn hàng')
      },
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
        if(cur.productName === 'Tổng tiền') {
          return acc
        }
        return acc + (Number(cur.discountedPrice) * Number(cur.quantityOrder))
      }, 0)
      console.log(tongTien)
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
    onConfirmSave() {
      if(!this.tableData || this.tableData.length === 0) {
        errAlert(this, 'Hãy thêm sản phẩm vào đơn hàng')
        return
      }
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.$confirm(`Bạn có chắc muốn tạo đơn hàng`, '', {
          confirmButtonText: 'Có',
          cancelButtonText: 'Không',
          cancelButtonClass: 'el-icon-close',
          confirmButtonClass: 'el-icon-check',
          type: 'warning'
        }).then(() => {
          this.onSave()
        }).catch(_ => {
        })
      })
    },
    onSave() {
      let orderDetails = []
      this.tableData.forEach(item => {
        if (item.productName !== 'Tổng tiền') {
          orderDetails.push({
            "productId": item.productId,
            "quantityOrder": item.quantityOrder,
          })
        }
      })
      orderDetails.forEach((item) => {
        item.quantityOrder = Number(item.quantityOrder)
      })
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
    onDelete(index, row) {
      this.$confirm(`Bạn có chắc muốn xóa sản phẩm "${row.productName}" khỏi đơn hàng`, '', {
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        cancelButtonClass: 'el-icon-close',
        confirmButtonClass: 'el-icon-check',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.tableData.forEach((item, index) => {
          if(index === this.tableData.length - 1) {
            item.subTotal = this.formatCurrencyFunction(Number(this.totalPrice))
          } else {
            item.subTotal = this.formatCurrencyFunction(item.discountedPrice * item.quantityOrder)
          }
        })
      }).catch(_ => {
      })
    },
    showDialogAddProduct() {
      this.isShowDialogAddProduct = true
    },
    onChangeQuantity(row) {
      if(row.quantityOrder < 1) {
        row.quantityOrder = 1
      }
      this.tableData.forEach((item, index) => {
        if(index === this.tableData.length - 1) {
          item.subTotal = this.formatCurrencyFunction(Number(this.totalPrice))
        } else {
          item.subTotal = this.formatCurrencyFunction(item.discountedPrice * item.quantityOrder)
        }
      })
      console.log(this.tableData)
    },
    onAddProduct(val) {
      console.log(val)
      const cloneVal = JSON.parse(JSON.stringify(val));
      cloneVal.forEach(item => {
        this.tableData.push(item)
      })
      this.tableData.forEach((item, index) => {
        if(item.productName === 'Tổng tiền') {
          this.tableData.splice(index, 1)
        }
      })
      this.tableData.push({
        productName: 'Tổng tiền',
        price: '',
        subTotal: this.formatCurrencyFunction(this.totalPrice),
        notShowInputQuantity: true })
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
