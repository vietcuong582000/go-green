<template>
  <card>
    <apexchart ref="chartTop" id="chartTop" type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </card>
</template>
<script>
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";

const FUNCTION_CODE = 'CATEGORY'
export default {
  components: {
  },
  props: {
    dateStatistical: {
      type: Number,
      default: 30,
    }
  },
  data () {
    return {
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
        colors: ['#85ce61'],
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
            show: true,
            formatter: function (val) {
              return val;
            }
          }

        },
        title: {
          text: '',
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
      this.series = []
      ApiFactory.callAPI(ConstantAPI["PRODUCT"].GET_HOT_PRODUCT, {}, {typeDate: this.dateStatistical}).then(rs => {
        this.chartOptions = {
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
          colors: ['#85ce61'],
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
              show: true,
              formatter: function (val) {
                return val;
              }
            }

          },
          title: {
            text: 'Thống kê sản phẩm bán chạy trong ' + this.dateStatistical + ' ngày qua',
            floating: true,
            offsetY: 0,
            align: 'center',
            style: {
              color: '#444',
              fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
              fontWeight:  'bold'
            }
          }
        }
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
  }
}
</script>
