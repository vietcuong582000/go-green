<template>
  <div class="content">
    <vue-title title="GoGreen - Thống kê"></vue-title>
    <div class="container-fluid">
      <el-card :header="'THỐNG KÊ'" shadow="never">
        <el-form ref="form" :model="form" :rules="rules" label-width="160px" label-position="left">
          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item label="Loại thống kê" prop="typeStatistical" label-width="150px">
                <el-select style="width: 100%" v-model="form.typeStatistical" placeholder="Loại thống kê" @change="onChangeTypeStatistical">
                  <el-option
                    v-for="item in listTypeStatistical"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
              <el-form-item ref="dateStatistical" label="Ngày thống kê" prop="dateStatistical" label-width="150px">
                <el-select v-if="form.typeStatistical === 'topProduct'" style="width: 100%" v-model="form.dateStatistical" placeholder="Ngày thống kê">
                  <el-option
                    v-for="item in listDateStatisticalTopProduct"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key">
                  </el-option>
                </el-select>
                <el-select v-if="form.typeStatistical === 'sales'" style="width: 100%" v-model="form.dateStatistical" placeholder="Ngày thống kê">
                  <el-option
                    v-for="item in listDateStatisticalSales"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="width: 100%; text-align: center; margin-bottom: 20px">
          <el-button type="success" @click="onSearch">Thống kê</el-button>
        </div>
        <div id="chart" class="col-md-12">
          <card>
            <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
          </card>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
>>> .el-card__header {
  font-size: 20px
}
</style>
<script>
import LTable from '@/components/Table.vue'
import Card from '@/components/Cards/Card.vue'
import VueTitle from "@/components/VueTitle";
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import {requiredRule} from "@/utils/Validate";

const FUNCTION_CODE = 'CATEGORY'
export default {
  components: {
    LTable,
    Card,
    VueTitle
  },
  data () {
    return {
      form: {
        typeStatistical: 'topProduct',
        dateStatistical: ''
      },
      rules: {
        typeStatistical: requiredRule('Loại thống kê'),
        dateStatistical: requiredRule('Ngày thống kê')
      },
      listTypeStatistical: [
        {
          key: 'topProduct',
          label: 'Thống kê sản phẩm bán chạy'
        },
        {
          key: 'sales',
          label: 'Thống kê doanh số'
        }
      ],
      listDateStatisticalTopProduct: [
        {
          key: 7,
          label: '7 ngày qua'
        },
        {
          key: 30,
          label: '30 ngày qua'
        },
        {
          key: 90,
          label: '90 ngày qua'
        },
        {
          key: 365,
          label: 'Năm nay'
        }
      ],
      listDateStatisticalSales: [
        {
          key: 7,
          label: '7 ngày qua'
        },
        {
          key: 365,
          label: 'Năm nay'
        }
      ],
      series: [],

      chartOptions: {
        chart: {
          height: 400,
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

        xaxis: {
          categories: [],
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
          text: 'Thống kê sản phẩm bán chạy 7 ngày qua',
          floating: true,
          offsetY: 0,
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
  },
  methods: {
    onSearch() {
      this.$refs.form.validate(valid => {
        if(!valid) return
        if(this.form.typeStatistical === 'topProduct') {
          this.series = []
          ApiFactory.callAPI(ConstantAPI["PRODUCT"].GET_HOT_PRODUCT, {}, {typeDate: this.form.dateStatistical}).then(rs => {
            let listData = []
            rs.response_data.forEach(item => {
              listData.push(item[1])
              this.chartOptions.xaxis.categories.push(item[0])
            })
            this.series.push({
              name: 'Số lượng đặt mua',
              data: listData
            })
          })
        }
      })
    },
    onChangeTypeStatistical() {
      this.$refs.dateStatistical.resetField()
    }
  }
}
</script>
<style>
</style>
