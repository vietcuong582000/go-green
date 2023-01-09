<template>
  <div class="content">
    <vue-title title="GoGreen - Dashboard"></vue-title>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-apple text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Capacity</p>
              <h4 class="card-title">105GB</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-notes text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Revenue</p>
              <h4 class="card-title">$1,345</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-calendar-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Errors</p>
              <h4 class="card-title">23</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Followers</p>
              <h4 class="card-title">+45</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>
        <div class="col-md-6">
          <card>
            <template slot="header">
              <h5 class="title" style="font-weight: bold">Danh sách sản phẩm sắp hết hạn</h5>
            </template>
            <div v-for="row in tableData.data">
              <div v-if="!row.isExpired" class="expired-product" :style="expiredProductStyle(row.diffDays)">
                Sản phẩm "<strong>{{ row.productName }}</strong>" còn &nbsp<strong>{{ row.diffDays }}</strong>&nbsp ngày đến ngày hết hạn (<strong>{{ row.expirationDate }}</strong>). Hãy giảm giá để sản phẩm được bán trước khi hết hạn
              </div>
              <div v-else class="expired-product">
                Sản phẩm "<strong>{{ row.productName }}</strong>" đã hết hạn. Yêu cầu chuyển trạng thái sản phẩm
              </div>
            </div>
          </card>
        </div>
        <div class="col-md-6">
          <card>
            <template slot="header">
              <h5 class="title" style="font-weight: bold">Danh sách sản phẩm sắp hết hạn</h5>
            </template>
            <div v-for="row in tableData.data">
              <div v-if="!row.isExpired" class="expired-product" :style="expiredProductStyle(row.diffDays)">
                Sản phẩm "<strong>{{ row.productName }}</strong>" còn &nbsp<strong>{{ row.diffDays }}</strong>&nbsp ngày đến ngày hết hạn (<strong>{{ row.expirationDate }}</strong>). Hãy giảm giá để sản phẩm được bán trước khi hết hạn
              </div>
              <div v-else class="expired-product">
                Sản phẩm "<strong>{{ row.productName }}</strong>" đã hết hạn. Yêu cầu chuyển trạng thái sản phẩm
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.expired-product {
  padding: 10px;
  border-top: solid 1px gray
}
</style>
<script>
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import VueTitle from "@/components/VueTitle";
  import ApiFactory from "@/utils/apiFactory";
  import {ConstantAPI} from "@/utils/ConstantAPI";
  import {errAlert} from "@/utils/Alert";

  export default {
    components: {
      LTable,
      StatsCard,
      VueTitle
    },
    data () {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        tableData: {
          data: []
        }
      }
    },
    mounted() {
      this.getListProductExpired()
    },
    methods: {
      getListProductExpired() {
        ApiFactory.callAPI(ConstantAPI["PRODUCT"].GET_LIST_EXPIRED, {}, '').then(rs => {
          let listProduct = rs.response_data.data
          listProduct.forEach(item => {
            let expirationDate = new Date(item.expirationDate)
            if (expirationDate - new Date() > 0) {
              const diffTime = Math.abs(expirationDate - new Date());
              item.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              item.isExpired = false
            } else {
              item.isExpired = true
            }
            item.expirationDate = expirationDate.getDate() + '/' + (expirationDate.getMonth() + 1) + '/' + expirationDate.getFullYear()
            // item.title = `Sản phẩm "${item.productName}" còn ${diffDays} đến ngày hết hạn (${expirationDate})`
          })
          this.tableData.data = listProduct
        }).catch(err => {
          errAlert(this, 'Lỗi khi lấy danh sách sản phẩm hết hạn')
        })
      },
      expiredProductStyle(diffDays) {
        if (diffDays <= 1) {
          return { color: 'red' }
        } else if (diffDays <= 2 && 1 < diffDays) {
          return { color: '#ff7600' }
        } else {
          return { color: 'green' }
        }
      }
    }
  }
</script>
<style>

</style>
