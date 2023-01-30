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
          enabled: false,
          formatter: function (val) {
            return formatCurrency(val);
          },
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Doanh số 7 ngày qua',
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
          categories: this.get7Days(),
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
        if(this.dateStatistical === 7) {
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
        } else if(this.dateStatistical === 365) {
          rs.response_data.forEach(item => {
            item[1] = new Date(item[1])
            item[2] = item[1].getMonth()
            arrayData.splice(item[2], 1, item[0])
          })
          this.chartOptions.xaxis.categories = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12']
        }
        this.series.push({
          name: 'Doanh số',
          data: arrayData
        })
      })
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
  }
}
</script>
