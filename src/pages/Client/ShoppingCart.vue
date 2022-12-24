<template>
  <el-card shadow="never">
    <vue-title title="GoGreen - Giỏ hàng"></vue-title>
    <span slot="header" style="font-weight: 600; font-size: 20px">Giỏ hàng</span>
    <el-row :gutter="20">
      <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="stt"
            label="STT"
            width="50"
            header-align="center"
            align="center"
            type="index"
            :index="(i) => {return ((currentPage >= 1 ? currentPage - 1 : 0) * pageSize) + i + 1}"/>
          <el-table-column
            prop="productName"
            label="Sản phẩm"
            header-align="center"
            :show-overflow-tooltip="true"
            align="center"
            min-width="150"
          >
            <template slot-scope="{row}">
              <div style="display: flex; gap: 10px">
                <img :src="row.imgUrl"  alt="" style="max-width: 150px; height: 50px"/>
                <div style="width: calc(100% - 150px); text-align: left">
                  <div>{{ row.productName }}</div>
                  <div>Số lượng:
                      <el-input
                        v-model="row.quantity"
                        style="width: 80px"
                        placeholder="Số lượng"
                        maxlength="5"
                        type="number"
                        size="mini"
                        :show-word-limit="true"
                      />
                  </div>
                  <div>Đơn giá: {{ formatCurrencyFunction(row.unitPrice) }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="Thành tiền"
            :show-overflow-tooltip="true"
            header-align="center"
            width="100"
            :formatter="(row, col, val) => formatCurrencyFunction(row.unitPrice * row.quantity)"
          />
          <el-table-column
            label="Thao tác"
            header-align="center"
            width="90"
            :show-overflow-tooltip="true"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tooltip :content="'Xóa'" :open-delay="200" placement="top" effect="light">
                <el-button
                  type="danger"
                  size="small"
                  style="outline: none"
                  icon="el-icon-delete"
                  circle
                  plain
                >
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>
<style>
.buy-button {
  background: #29a974;
  color: #FFFFFF;
  -webkit-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  -moz-box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
  box-shadow: 0px 15px 30px -15px rgba(82,82,82,0.5);
}
.buy-button:hover {
  background: #33b47e;
  color: #FFFFFF;
}
.add-cart {
  color: #29a974;
}
.add-cart:hover {
  background: #92c5ac;
  color: #FFFFFF;
}
</style>
<script>
import {formatCurrency} from "@/utils/Fomatter";
import VueTitle from "@/components/VueTitle";
import ApiFactory from "@/utils/apiFactory";
import {ConstantAPI} from "@/utils/ConstantAPI";
import {errAlert} from "@/utils/Alert";

const FUNCTION_CODE = 'PRODUCT'
export default {
  components: {
    VueTitle
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      pageSizes: [5, 10, 20, 50, 100],
      total: 0,
      tableData: [],
      tableDataAll: [],
      isLoadingTable: true,
    }
  },
  mounted() {
    let cart
    if (cart === []) {
      cart = localStorage.getItem('cart')
    } else {
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    this.tableData = cart
    this.dataCart = cart
  },
  methods: {
    formatCurrencyFunction(number) {
      return formatCurrency(number)
    },
  },
}
</script>
