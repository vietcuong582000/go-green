<template>
  <div>
    <el-carousel type="card" :interval="3000" style="width: 960px; margin: auto" :height="'270px'" indicator-position="outside">
      <el-carousel-item>
        <img style="width: 480px" src="../../../public/img/background-admin.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img style="width: 480px" src="../../../public/img/background-admin-2.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img style="width: 480px" src="../../../public/img/background-admin-3.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img style="width: 480px" src="../../../public/img/background-admin-4.jpg" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
