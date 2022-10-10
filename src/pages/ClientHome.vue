<template>
  <div>
    <div class="header-home">
      <el-menu
        :default-active="activeIndex"
        class="header-menu"
        mode="horizontal"
        background-color="#78BE21"
        text-color="#FFFFFF"
        active-text-color="#395C0F"
        @select="handleSelect">
        <el-menu-item index="1">Home</el-menu-item>
        <el-submenu index="2">
          <template slot="title">Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="4"><a target="_blank">Orders</a></el-menu-item>
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
  /*background-image: url('../../public/img/background-home2.jpg');*/
  background-color: #d3d3d3;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
}
.header-home {
  width: 80%;
  position: fixed;
  top: 20px;
  left: 10%;
  border-radius: 10px;
  z-index: 999;
}
.header-menu {
  border-radius: 10px;
  padding: 10px;
}
.container-home {
  position: relative;
  height: 200vh;
  background-color: #78BE21;
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
