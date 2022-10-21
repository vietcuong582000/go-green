<template>
  <div class="wrapper">
    <side-bar :style="{ display: mainPanelDisplay, opacity: mainPanelOpacity }" :title="'GO GREEN'">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
<!--      <sidebar-link to="/admin/user">-->
<!--        <i class="nc-icon nc-circle-09"></i>-->
<!--        <p>User Profile</p>-->
<!--      </sidebar-link>-->
      <sidebar-link to="/admin/product-list">
        <i class="nc-icon nc-notes"></i>
        <p>Danh sách sản phẩm</p>
      </sidebar-link>
      <sidebar-link to="/admin/category-list">
        <i class="nc-icon nc-tag-content"></i>
        <p>Danh mục sản phẩm</p>
      </sidebar-link>
      <sidebar-link to="/admin/order-list">
        <i class="nc-icon nc-delivery-fast"></i>
        <p>Danh sách đơn hàng</p>
      </sidebar-link>
      <sidebar-link to="/admin/customer-list">
        <i class="nc-icon nc-circle-09"></i>
        <p>Danh sách khách hàng</p>
      </sidebar-link>
      <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-chart-bar-32"></i>
        <p>Thống kê</p>
      </sidebar-link>

<!--      <template slot="bottom-links">-->
<!--        <sidebar-link class="active"-->
<!--                      to="/admin/upgrade">-->
<!--          <i class="nc-icon nc-alien-33"></i>-->
<!--          <p>Upgrade to PRO</p>-->
<!--        </sidebar-link>-->
<!--      </template>-->
    </side-bar>
    <div class="main-panel" :style="{ width: mainPanelWidth }">
      <top-navbar @toggle-sidebar="showSideBar"></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

<!--      <content-footer></content-footer>-->
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    data() {
      return {
        isShowSideBar: true,
        fullWidth: '100%',
        withSideBarWidth: 'calc(100% - 275px)'
      }
    },
    computed: {
      mainPanelWidth() {
        return this.isShowSideBar ? this.withSideBarWidth : this.fullWidth
      },
      mainPanelDisplay() {
        return this.isShowSideBar ? 'block' : 'none'
      },
      mainPanelOpacity() {
        return this.isShowSideBar ? '100' : '0'
      }
    },
    methods: {
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      showSideBar() {
        this.isShowSideBar = !this.isShowSideBar
      }
    }
  }

</script>
