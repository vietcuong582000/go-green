<template>
  <el-card shadow="never" style="height: 500px; text-align: center">
    <vue-title title="GoGreen - Thông tin thanh toán"></vue-title>
    <div v-if="status === '00'" style=" width: 60%; background-color: #d5f5e9; margin: auto; text-align: center; padding: 10px 10px">
      <div style="display: inline">
        <img style="width: 75px" src="../../public/img/checkmark-flat.png" alt="" />
      </div>
      <span style="font-size: 16px; font-weight: bold; margin-left: 10px;">Đơn hàng đã được thanh toán thành công</span>
    </div>

    <div v-else style=" width: 60%; background-color: #fad5d5; margin: auto; text-align: center; padding: 10px 10px">
      <div style="display: inline">
        <img style="width: 75px" src="../../public/img/reject-icon.png" alt="" />
      </div>
      <span style="font-size: 16px; font-weight: bold; margin-left: 10px;">Đơn hàng bị hủy hoặc đã xảy ra lỗi</span>
    </div>

    <el-button
      class="return-home"
      style="margin-top: 20px"
      type="success"
      @click="goToHome"
    >Quay về trang chủ
    </el-button>
  </el-card>
</template>
<style scoped>
.return-home {
  background: #29a974;
  color: #FFFFFF;
  -webkit-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  -moz-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
}
</style>
<script>
import {formatCurrency} from "@/utils/Fomatter";
import VueTitle from "@/components/VueTitle";
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import {errAlert} from "@/utils/Alert";

export default {
  components: {
    VueTitle
  },
  data() {
    return {
      status: '',
      payload: '',
    }
  },
  mounted() {
    console.log(this.$route.query)
    let responseParam = this.$route.query
    this.status = responseParam.vnp_TransactionStatus
    if(this.status === '00') {
      localStorage.removeItem("cart")
    }
    this.payload = JSON.parse(localStorage.getItem('order'))
    console.log(this.payload)
    ApiFactory.callAPI(ConstantAPI['ORDER'].CREATE, this.payload, {}).then(rs => {
      console.log(rs)
    }).catch(err => {
      errAlert(this, 'Có lỗi xảy ra')
    })
    console.log(this.status)
  },
  methods: {
    goToHome() {
      this.$router.push({
        name: 'home'
      })
    },
  },
}
</script>
