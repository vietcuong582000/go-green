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
          <el-button type="default" @click="onClose">Đóng thống kê</el-button>
        </div>
        <div id="chart" class="col-md-12">
          <top-product-chart ref="topProduct" v-show="isShowTopProduct" :date-statistical="form.dateStatistical" ></top-product-chart>
          <sales-chart ref="sales" v-show="isShowSales" :date-statistical="form.dateStatistical"></sales-chart>
          <sales-chart-year ref="salesYear" v-show="isShowSalesYear" :date-statistical="form.dateStatistical"></sales-chart-year>
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
import {requiredRule} from "@/utils/Validate";
import TopProductChart from "@/pages/Statistical/TopProductChart";
import SalesChart from "@/pages/Statistical/SalesChart";
import SalesChartYear from "@/pages/Statistical/SalesChartYear";

const FUNCTION_CODE = 'CATEGORY'
export default {
  components: {
    LTable,
    Card,
    VueTitle,
    TopProductChart,
    SalesChart,
    SalesChartYear
  },
  data () {
    return {
      isShowTopProduct: false,
      isShowSales: false,
      isShowSalesYear: false,
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
    }
  },
  mounted() {
  },
  methods: {
    onSearch() {
      this.$refs.form.validate(valid => {
        if(!valid) return
        if(this.form.typeStatistical === 'topProduct') {
          this.isShowSales = false
          this.isShowSalesYear = false
          this.isShowTopProduct = true
          this.$refs.topProduct.onSearch()
        }
        if(this.form.typeStatistical === 'sales' && this.form.dateStatistical === 7) {
          this.isShowSales = true
          this.isShowSalesYear = false
          this.isShowTopProduct = false
          this.$refs.sales.onSearch()
        }
        if(this.form.typeStatistical === 'sales' && this.form.dateStatistical === 365) {
          this.isShowSales = false
          this.isShowSalesYear = true
          this.isShowTopProduct = false
          this.$refs.salesYear.onSearch()
        }
      })
    },
    onChangeTypeStatistical() {
      this.$refs.dateStatistical.resetField()
    },
    onClose() {
      this.isShowTopProduct = false
      this.isShowSales = false
      this.isShowSalesYear = false
    }
  }
}
</script>
<style>
</style>
