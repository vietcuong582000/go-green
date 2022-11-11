<template>
  <el-card shadow="never">
    <vue-title title="GoGreen - Chi tiết sản phẩm"></vue-title>
    <span slot="header" style="font-weight: 600; font-size: 20px">Thông tin chi tiết sản phẩm</span>
    <el-row :gutter="20">
      <el-col :span="12">
        <div style="height: 300px; max-width: 100%">
          <img style="max-height: 300px; max-width: 100%; display: block" :src="$route.params.imgUrl" class="image"  alt="" />
        </div>
      </el-col>
      <el-col :span="12">
        <div style="margin-top: 15px">
          <span style="font-size: 18px;font-weight: 700">{{ $route.params.productName }}</span>
          <div class="icon-discount">-{{ $route.params.discount }}%</div>
          <div>
            <span style="font-weight: 600;color: red;">{{ formatCurrency($route.params.discountPrice) }}/{{ $route.params.unit }}</span>
            <span style="margin-left: 15px; font-size: 14px; text-decoration: line-through;">{{ formatCurrency($route.params.unitPrice) }}/{{ $route.params.unit }}</span>
          </div>
          <div style="margin-top: 10px">
            <el-button class="buy-button">
              <i class="el-icon-money" />
              Đặt mua
            </el-button>
            <el-button class="add-cart">
              <i class="el-icon-shopping-cart-2" />
              Thêm vào giỏ hàng
            </el-button>
          </div>
          <div style="margin-top: 20px">Mô tả sản phẩm: {{ $route.params.description }}</div>
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

export default {
  components: {
    VueTitle
  },
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  methods: {
    formatCurrency
  },
}
</script>
