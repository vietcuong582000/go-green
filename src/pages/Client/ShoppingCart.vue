<template>
  <el-card shadow="never">
    <vue-title title="GoGreen - Giỏ hàng"></vue-title>
    <span slot="header" style="font-weight: 600; font-size: 20px">Giỏ hàng</span>
    <el-row :gutter="20">
      <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24" style="margin-bottom: 10px; margin-top: 10px">
        <el-table
          :data="tableData"
          border
          stripe
          :summary-method="getSummaries"
          show-summary
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
            prop="productName"
            label="Sản phẩm"
            header-align="center"
            :show-overflow-tooltip="true"
            align="center"
            min-width="150"
          >
            <template slot-scope="{row}">
              <div style="display: flex; gap: 10px">
                <img :src="row.imgUrl"  alt="" style="width: 90px; height: 50px"/>
                <div style="width: calc(100% - 150px); text-align: left">
                  <div>{{ row.productName }}</div>
                  <div>Số lượng:
                      <el-input
                        v-model="row.quantity"
                        style="width: 80px"
                        placeholder="Số lượng"
                        maxlength="5"
                        type="number"
                        size="mini"
                        :show-word-limit="true"
                        @change="onChangeQuantity(row)"
                      />
                  </div>
                  <div>Đơn giá: {{ formatCurrencyFunction(row.discountedPrice) }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="Thành tiền"
            :show-overflow-tooltip="true"
            header-align="center"
            width="100"
            :formatter="(row, col, val) => formatCurrencyFunction(row.discountedPrice * row.quantity)"
          />
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
      </el-col>
      <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24" style="margin-bottom: 10px; margin-top: 10px">
        <el-card class="info-cart" shadow="never">
          <div slot="header">
            <strong>Thông tin đơn hàng</strong>
          </div>
          <el-form ref="form" :model="form" :rules="rules" label-width="150px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="24">
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
              <el-col :span="24">
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
              <el-col :span="24">
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
              <el-col :span="24">
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
              <el-col :span="24">
                <el-form-item label="Hình thức thanh toán" prop="paymentMethod" label-width="170px">
                  <el-radio v-model="form.paymentMethod" label="COD">Thanh toán trực tiếp</el-radio>
                  <el-radio v-model="form.paymentMethod" label="CREDIT_CARD">Thanh toán online <img style="height: 20px" src="../../../public/img/vnpay2.jpg" alt=""/></el-radio>
                </el-form-item>
              </el-col>
              <a id="urlVnPay" style="visibility: hidden" :href="this.urlVnPay" target="_self"> Link </a>
              <el-col :span="24" style="text-align: center">
                <el-button
                  class="pay-button"
                  type="success"
                  @click="onShowConfirm"
                >Đặt hàng</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<style scoped>
.pay-button {
  background: #29a974;
  color: #FFFFFF;
  -webkit-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  -moz-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
}
.pay-button:hover {
  background: #33b47e;
  color: #FFFFFF;
}

>>> .el-radio__input.is-checked+.el-radio__label {
  color: #29a974;
}

>>> .el-radio__input.is-checked .el-radio__inner {
  border-color: #29a974;
  background: #29a974;
}

>>> .info-cart .el-card__header {
  padding-top: 10px;
  padding-bottom: 9.5px;
}
</style>
<script>
import {formatCurrency} from "@/utils/Fomatter";
import VueTitle from "@/components/VueTitle";
import {emailRule, phoneRule, requiredRule} from "@/utils/Validate";
import sha265 from "sha256";
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import {errAlert} from "@/utils/Alert";

const FUNCTION_CODE = 'PRODUCT'
export default {
  components: {
    VueTitle
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50, 100],
      total: 0,
      tableData: [],
      tableDataAll: [],
      isLoadingTable: true,
      form: {
        fullName: '',
        shippingAddress: '',
        customerNumber: '',
        customerEmail: '',
        paymentMethod: 'COD',
      },
      rules: {
        fullName: requiredRule('Họ và tên'),
        shippingAddress: requiredRule('Địa chỉ'),
        customerNumber: [requiredRule('Số điện thoại'), phoneRule('Số điện thoại')],
        customerEmail: [requiredRule('Email'), emailRule('Email')]
      },
      urlVnPay: '',
      payload: {}
    }
  },
  mounted() {
    let cart
    if (cart === []) {
      cart = localStorage.getItem('cart')
    } else {
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    if(cart) {
      const newCart = Object.values(cart.reduce((acc, cur) => {

        acc[cur.id] = acc[cur.id] || {...cur, quantity: '0'}
        acc[cur.id].quantity = (Number(acc[cur.id].quantity) + Number(cur.quantity)).toString()
        return acc
      }, {}))
      this.tableData = newCart
      this.dataCart = newCart
    }
  },
  computed: {
    totalPrice() {
      const tongTien = this.tableData.reduce((acc, cur) => {
        return acc + (cur.discountedPrice * cur.quantity)
      }, 0)
      return tongTien
    }
  },
  methods: {
    formatCurrencyFunction(number) {
      return formatCurrency(number)
    },
    onChangeQuantity(row) {
      if(row.quantity < 1) {
        row.quantity = 1
      }
      localStorage.setItem('cart', JSON.stringify(this.tableData))
    },
    onDelete(index, row) {
      this.$confirm(`Bạn có chắc muốn xóa sản phẩm "${row.productName}" khỏi giỏ hàng`, '', {
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        cancelButtonClass: 'el-icon-close',
        confirmButtonClass: 'el-icon-check',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(this.tableData))
      }).catch(_ => {
      })
    },
    getSummaries(param) {
      const sums = [];
      sums[0] = ''
      sums[1] = 'Tổng tiền'
      const tongTien = this.tableData.reduce((acc, cur) => {
        return acc + (cur.discountedPrice * cur.quantity)
      }, 0)
      sums[2] = this.formatCurrencyFunction(tongTien)
      return sums;
    },
    onShowConfirm() {
      this.$refs.form.validate(valid => {
        if(!valid) return
        this.$confirm(`Bạn có chắc muốn tạo đơn hàng này`, '', {
          confirmButtonText: 'Có',
          cancelButtonText: 'Không',
          cancelButtonClass: 'el-icon-close',
          confirmButtonClass: 'el-icon-check',
          type: 'warning'
        }).then(() => {
          this.onOrder()
        }).catch(err => {
          console.log(err)
        })
      })
    },
    onOrder() {
      let orderDetails = []
      this.tableData.forEach(item => {
        orderDetails.push({
          "quantityOrder": Number(item.quantity),
          "productId": item.id
        })
      })
      this.payload = {
        "shippingAddress": this.form.shippingAddress,
        "paymentMethod": this.form.paymentMethod,
        "customerInfo": {
          "fullName": this.form.fullName,
          "phoneNumber": this.form.customerNumber,
          "email": this.form.customerEmail
        },
        "orderStatus": "NEW",
        "orderDetails": orderDetails
      }
      localStorage.setItem('order', JSON.stringify(this.payload))
      if(this.form.paymentMethod === 'CREDIT_CARD') {
        let urlVnPay = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
        let hashSecret = 'YTPTETIVKQJKEYPIDNKKDGQOKXYTSHDJ'
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        let date = new Date().getDate()
        if (date < 10) {
          date = '0' + date
        }
        let hour = new Date().getHours()
        if(hour < 10) {
          hour = '0' + hour
        }
        let minute = new Date().getMinutes()
        if(minute < 10) {
          minute = '0' + minute
        }
        let second = new Date().getSeconds()
        if(second < 10) {
          second = '0' + second
        }
        console.log('' + year + month + date + hour + minute + second)
        let params = {
          vnp_Amount: this.totalPrice * 100,
          vnp_Command: 'pay',
          vnp_CreateDate: '' + year + month + date + hour + minute + second ,
          vnp_CurrCode: 'VND',
          vnp_IpAddr: '126.0.0.1',
          vnp_Locale: 'vn',
          vnp_OrderInfo: 'Thanh+toan+don+hang+GoGreen',
          vnp_OrderType: 'other',
          // vnp_ReturnUrl: 'http%3A%2F%2Flocalhost%3A8080%2F%23%2Fpayment-status',
          vnp_ReturnUrl: 'https%3A%2F%2Fgo-green-5959e.firebaseapp.com%2F%2F%23%2Fpayment-status',
          vnp_TmnCode: 'TKFPLOQ4',
          vnp_TxnRef: '' + year + month + date + hour + minute + second + new Date().getMilliseconds(),
          vnp_Version: '2.1.0',
        }
        let strParam = Object.keys(params).map(function(key) {
          return key + '=' + params[key];
        }).join('&');
        urlVnPay = `${urlVnPay}?${strParam}`;
        const secureHash = sha265(hashSecret + strParam)
        urlVnPay = urlVnPay + '&vnp_SecureHash=' + secureHash
        console.log(urlVnPay)
        this.urlVnPay = urlVnPay
        setTimeout(() => {
          document.getElementById('urlVnPay').click()
        }, 1000)
      } else {
        ApiFactory.callAPI(ConstantAPI['ORDER'].CREATE_HOME, this.payload, {}).then(rs => {
          this.$notify({
            title: 'Tạo đơn hàng thành công',
            dangerouslyUseHTMLString: true,
            message: 'Đơn hàng của bạn đã được tạo và gửi cho hệ thống thành công',
            type: 'success'
          })
          console.log('alo')
          // this.$refs.form.reset()
          localStorage.removeItem("cart")
          this.tableData = []
          this.$refs.form.resetFields()
        }).catch(err => {
          errAlert(this, 'Có lỗi xảy ra')
        })
      }
    }
  },
}

</script>
