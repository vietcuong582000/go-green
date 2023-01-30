<template>
  <div class="content">
    <vue-title title="GoGreen - Dashboard"></vue-title>
    <div class="container-fluid">
      <div class="row">
<!--        <div class="col-xl-3 col-md-6">-->
<!--          <stats-card>-->
<!--            <div slot="header" class="icon-warning">-->
<!--              <i class="nc-icon nc-apple text-danger"></i>-->
<!--            </div>-->
<!--            <div slot="content">-->
<!--              <p class="card-category">Capacity</p>-->
<!--              <h4 class="card-title">105GB</h4>-->
<!--            </div>-->
<!--            <div slot="footer">-->
<!--              <i class="fa fa-refresh"></i>Updated now-->
<!--            </div>-->
<!--          </stats-card>-->
<!--        </div>-->

<!--        <div class="col-xl-3 col-md-6">-->
<!--          <stats-card>-->
<!--            <div slot="header" class="icon-success">-->
<!--              <i class="nc-icon nc-notes text-success"></i>-->
<!--            </div>-->
<!--            <div slot="content">-->
<!--              <p class="card-category">Revenue</p>-->
<!--              <h4 class="card-title">$1,345</h4>-->
<!--            </div>-->
<!--            <div slot="footer">-->
<!--              <i class="fa fa-calendar-o"></i>Last day-->
<!--            </div>-->
<!--          </stats-card>-->
<!--        </div>-->

<!--        <div class="col-xl-3 col-md-6">-->
<!--          <stats-card>-->
<!--            <div slot="header" class="icon-danger">-->
<!--              <i class="nc-icon nc-vector text-danger"></i>-->
<!--            </div>-->
<!--            <div slot="content">-->
<!--              <p class="card-category">Errors</p>-->
<!--              <h4 class="card-title">23</h4>-->
<!--            </div>-->
<!--            <div slot="footer">-->
<!--              <i class="fa fa-clock-o"></i>Last day-->
<!--            </div>-->
<!--          </stats-card>-->
<!--        </div>-->

<!--        <div class="col-xl-3 col-md-6">-->
<!--          <stats-card>-->
<!--            <div slot="header" class="icon-info">-->
<!--              <i class="nc-icon nc-favourite-28 text-primary"></i>-->
<!--            </div>-->
<!--            <div slot="content">-->
<!--              <p class="card-category">Followers</p>-->
<!--              <h4 class="card-title">+45</h4>-->
<!--            </div>-->
<!--            <div slot="footer">-->
<!--              <i class="fa fa-refresh"></i>Updated now-->
<!--            </div>-->
<!--          </stats-card>-->
<!--        </div>-->
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
        <div id="chart" class="col-md-12">
          <card>
            <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
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
        arrayDate: [],
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        tableData: {
          data: []
        },
        series: [],

        chartOptions: {
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val;
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          colors: ['#85ce61'],
          xaxis: {
            categories: this.get7Days(),
            position: 'top',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
            tooltip: {
              enabled: true,
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val;
              }
            }

          },
          title: {
            text: 'Thống kê số lượng đơn hàng 7 ngày qua',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
              color: '#444',
              fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
              fontWeight:  'bold'
            }
          }
        },
      }
    },
    mounted() {
      this.getListProductExpired()
      this.getDataChart()
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
      },
      get7Days() {
        let arrayDate = []
        for(let i = 6; i >= 0 ; i--) {
          let date = new Date();
          let last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
          let day =last.getDate();
          let month=last.getMonth()+1;
          let year=last.getFullYear()
          arrayDate.push(day + '/' + month)
        }
        this.arrayDate = arrayDate
        return arrayDate
      },
      getDataChart() {
        ApiFactory.callAPI(ConstantAPI["ORDER"].GET_LIST_BY_DATE, {}, '').then(rs => {
          let arrayData = [0, 0, 0, 0, 0, 0, 0]
          rs.response_data.forEach(item => {
            item[1] = new Date(item[1])
            item[2] = item[1].getDate() + '/' + (item[1].getMonth() + 1)
          })
          let arrayDates = this.get7Days()
          console.log(arrayDates)
          arrayDates.forEach(item => {
            rs.response_data.forEach(resItem => {
              if(item === resItem[2]) {
                let getIndex = arrayDates.indexOf(resItem[2])
                console.log(getIndex)
                arrayData.splice(getIndex, 1, resItem[0])
              }
            })
          })
          this.series.push({
            name: 'Số lượng đơn hàng',
            data: arrayData
          })
        })
      }
    }
  }
</script>
<style>

</style>
