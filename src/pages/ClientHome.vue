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
          <template slot="title">Sản phẩm</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">Giỏ hàng</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="4"><a target="_blank">Giỏ hàng</a></el-menu-item>
        <el-menu-item index="5"><a target="_blank">Đơn hàng</a></el-menu-item>
        <el-menu-item index="4"><a target="_blank">Giới thiệu</a></el-menu-item>
      </el-menu>
    </div>
    <div class="background">
    </div>
    <div class="container-home">
      <div class="main-content">

      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  min-height: 75vh;
  background-image: url('../../public/img/background-home-4.jpg');
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
  height: 200vh;
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
  left: 2.5%
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
