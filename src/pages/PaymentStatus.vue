<template>
  <el-card shadow="never">
    <vue-title title="GoGreen - Thông tin thanh toán"></vue-title>
    <span>Đợi thông tin thanh toán</span>
  </el-card>
</template>
<style scoped>

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
      productDetail: {},
      quantity: 1
    }
  },
  mounted() {
    console.log(this.$route.query)
  },
  methods: {

  },
}
</script>
