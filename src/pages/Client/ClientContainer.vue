<template>
  <div>
    <div class="header-home">
      <el-menu
        :default-active="activeIndex"
        class="header-menu"
        mode="horizontal"
        background-color="#035a37"
        text-color="#FFFFFF"
        active-text-color="#FFFFFF"
        @select="handleSelect">
        <el-menu-item index="1">Trang chủ</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Danh mục sản phẩm</template>
          <el-menu-item index="2-1">Trái cây</el-menu-item>
          <el-menu-item index="2-2">Giỏ trái cây</el-menu-item>
          <el-menu-item index="2-3">Sản phẩm từ trái cây</el-menu-item>
<!--          <el-submenu index="2-4">-->
<!--            <template slot="title">Giỏ hàng</template>-->
<!--            <el-menu-item index="2-4-1">item one</el-menu-item>-->
<!--            <el-menu-item index="2-4-2">item two</el-menu-item>-->
<!--            <el-menu-item index="2-4-3">item three</el-menu-item>-->
<!--          </el-submenu>-->
        </el-submenu>
        <el-menu-item index="4"><a target="_blank">Giỏ hàng</a></el-menu-item>
        <el-menu-item index="5"><a target="_blank">Đơn hàng</a></el-menu-item>
        <el-menu-item index="6"><a target="_blank">Giới thiệu</a></el-menu-item>
      </el-menu>
    </div>
    <div class="background">
    </div>
    <div class="container-home">
      <div class="main-content">
<!--        <router-view></router-view>-->
      </div>
    </div>
    <div class="footer-home">
      <div style="color: #FFFFFF" class="footer-content">
        <el-row :gutter="20">
          <el-col :span="12">
            <div style="font-weight: bold">CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ ĐẦU TƯ GOGREEN</div>
            <div>Địa chỉ: Dương Quàng Hàm, Quan Hoa, Cầu Giấy, Hà Nội</div>
            <div>Design and code by Cường DV with ❤</div>
            <div>
              <img style="height: 55px" src="../../../public/img/congthuong.png" alt=""/>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <span style="line-height: 1">Liên hệ đặt hàng: </span>
              <span style="font-weight: bold; color: #ff9761">0344123456</span>
            </div>
            <div class="logo-container">
              <span>Kết nối với chúng tôi qua: </span>
              <img style="height: 30px;cursor: pointer" src="../../../public/img/facebook.png" alt=""/>
            </div>
            <div>
              <span>Hình thức thanh toán:</span>
              <div class="logo-container">
                <img style="height: 30px" src="../../../public/img/vnpay2.jpg" alt=""/>
                <img style="height: 30px" src="../../../public/img/momo.png" alt=""/>
                <img style="height: 30px" src="../../../public/img/visa.png" alt=""/>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  min-height: 75vh;
  /*background-image: url('../../../public/img/background-home-4.jpg');*/
  background-color: #d3d3d3;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
}
.header-home {
  width: 100%;
  position: fixed;
  z-index: 999;
  background-color: #035a37;
}
.header-menu {
  padding: 10px;
  width: 95%;
  margin: auto;
}
.container-home {
  position: relative;
  min-height: 150vh;
  background-color: #d5f5e9;
}
.main-content {
  height: 150vh;
  width: 95%;
  margin: auto;
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  top: -100px;
  left: 2.5%;
  padding: 20px;
}
.footer-home {
  height: 150px;
  width: 100%;
  background-color: #035a37;
}
.footer-content {
  width: 95%;
  height: 150px;
  position: absolute;
  left: 2.5%;
  padding: 10px 0 0 10px
}
.icon-container {
  display: flex;
  gap: 10px
}
.logo-container {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
>>> .el-menu--horizontal>.el-menu-item {
  height: 30px;
  line-height: 30px;
}

>>> .el-menu--horizontal>.el-submenu .el-submenu__title {
  height: 30px;
  line-height: 30px;
}

>>> .el-menu--horizontal {
  border-bottom: none;
}
</style>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
