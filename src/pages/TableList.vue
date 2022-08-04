<template>
  <div class="content">
    <div class="container-fluid">
      <el-card :header="'Bonjour'">
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="stt"
            label="STT"
            width="75"
            header-align="center"
            align="center"
            type="index"
            :index="(i) => {return ((page >= 1 ? page - 1 : 0) * size) + i + 1}">
          </el-table-column>
          <el-table-column
            prop="date"
            label="Date"
            header-align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            header-align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="Address"
            header-align="center">
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page.sync="currentPage"
          :layout="'total, sizes, prev, pager, next, jumper'"
          :page-size.sync="pageSize"
          :page-sizes="pageSizes"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        page: 1,
        size: 20,
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }]
      }
    }
  }
</script>
<style>
</style>
