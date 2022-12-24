<template>
  <el-card shadow="never">
    <vue-title title="GoGreen - Chi tiết sản phẩm"></vue-title>
    <span slot="header" style="font-weight: 600; font-size: 20px">Thông tin chi tiết sản phẩm</span>
    <el-row :gutter="20">
      <el-col :span="12">
        <div style="height: 300px; max-width: 100%">
<!--          <img style="max-height: 300px; max-width: 100%; display: block" :src="$route.params.imgUrl" class="image"  alt="" />-->
        </div>
      </el-col>
      <el-col :span="12">
        <div style="margin-top: 15px">
          <span style="font-size: 18px;font-weight: 700">{{ productDetail.productName }}</span>
          <div class="icon-discount">-{{ productDetail.discount }}%</div>
          <div>
            <span style="font-weight: 600;color: red;">{{ formatCurrency(productDetail.discountPrice) }}/{{ productDetail.unit }}</span>
            <span style="margin-left: 15px; font-size: 14px; text-decoration: line-through;">{{ formatCurrency(productDetail.unitPrice) }}/{{ productDetail.unit }}</span>
          </div>
          <div style="margin-top: 10px">
            <el-button class="buy-button">
              <i class="el-icon-money" />
              Đặt mua
            </el-button>
            <el-button class="add-cart" @click="addToCart">
              <i class="el-icon-shopping-cart-2" />
              Thêm vào giỏ hàng
            </el-button>
          </div>
          <div style="margin-top: 20px">Mô tả sản phẩm: {{ productDetail.description }}</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<style>
.buy-button {
  background: #29a974;
  color: #FFFFFF;
  -webkit-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  -moz-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
}
.buy-button:hover {
  background: #33b47e;
  color: #FFFFFF;
}
.add-cart {
  color: #29a974;
}
.add-cart:hover {
  background: #92c5ac;
  color: #FFFFFF;
}
</style>
<script>
import {formatCurrency} from "@/utils/Fomatter";
import VueTitle from "@/components/VueTitle";
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
      productDetail: {}
    }
  },
  async beforeRouteUpdate(to, from) {
    // react to route changes...
    await ApiFactory.callAPI(ConstantAPI[FUNCTION_CODE].GET, {}, to.params.id).then(rs => {
      this.productDetail = rs
    }).catch(err => {
      errAlert(this, 'Lỗi khi lấy thông tin sản phẩm')
    })

  },
  mounted() {
    ApiFactory.callAPI(ConstantAPI[FUNCTION_CODE].GET, {}, this.$route.params.id).then(rs => {
      this.productDetail = rs
    }).catch(err => {
      errAlert(this, 'Lỗi khi lấy thông tin sản phẩm')
    })
  },
  methods: {
    addToCart() {
      let cart
      if (cart === []) {
        cart = localStorage.getItem('cart')
      } else {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      if(cart === null) {
        cart = []
      }
      cart.push(this.productDetail)
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    formatCurrency
  },
}
</script>
