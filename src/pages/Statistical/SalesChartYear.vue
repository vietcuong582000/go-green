<template>
  <card>
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </card>
</template>
<script>
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import {formatCurrency} from "@/utils/Fomatter";

const FUNCTION_CODE = 'CATEGORY'
export default {
  components: {
  },
  props: {
    dateStatistical: {
      type: Number,
      default: 7,
    }
  },
  data () {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Doanh số trong năm nay',
          align: 'left',
          style: {
            color: '#444',
            fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
            fontWeight:  'bold'
          }
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        colors: ['#85ce61'],
        xaxis: {
          categories: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function (val) {
              return formatCurrency(val) + ' VND';
            }
          }

        },
      },
    }
  },
  mounted() {
  },
  methods: {
    onSearch() {
      this.series = []
      ApiFactory.callAPI(ConstantAPI["ORDER"].GET_SALES_ORDER, {}, {typeDate: this.dateStatistical}).then(rs => {
        let arrayData = [0, 0, 0, 0, 0, 0, 0]
          rs.response_data.forEach(item => {
            item[1] = new Date(item[1])
            item[2] = item[1].getMonth()
            arrayData.splice(item[2], 1, item[0])
          })
        this.series.push({
          name: 'Doanh số',
          data: arrayData
        })
      })
    },
  }
}
</script>
