<template>
  <el-dialog
    :title="title"
    :visible.sync="isShowDialog"
    width="80%"
    :close-on-click-modal="false"
    @close="close">
    <el-card shadow="never">
      <el-form ref="form" :model="form" label-width="120px" label-position="left">
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Mã sản phẩm">
              <el-input v-model="form.productId" placeholder="Mã sản phẩm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Tên sản phẩm">
              <el-input v-model="form.productName" placeholder="Tên sản phẩm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Đơn giá">
              <money-input
                :value.sync="form.productPrice"
                placeholder="Đơn giá"
                :max-length="'15'"
                :prop="'productPrice'"
                :show-limit="true"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Số lượng">
              <el-input v-model="form.productQuantity" placeholder="Số lượng"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Ngày nhập">
              <el-date-picker
                v-model="form.productImportDate"
                type="date"
                placeholder="Ngày nhập"
                format="dd-MM-yyyy"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Ngày hết hạn">
              <el-date-picker
                v-model="form.productExpirationDate"
                type="date"
                placeholder="Ngày hết hạn"
                format="dd-MM-yyyy"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Danh mục">
              <el-select style="width: 100%" v-model="form.productCategory" placeholder="Danh mục">
                <el-option
                  v-for="item in listDanhMuc"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item label="Mô tả">
              <el-input
                v-model="form.productDescription"
                placeholder="Mô tả"
                type="textarea"
                :rows="3">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <span slot="footer">
      <el-button type="success" @click="close">Lưu</el-button>
      <el-button @click="close">Hủy</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MoneyInput from "../../components/Inputs/MoneyInput";

export default {
  components: {
    MoneyInput
  },
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {...FORM_DEFAULT},
      listDanhMuc: [
        {
          value: '1',
          label: 'Trái cây'
        },
        {
          value: '2',
          label: 'Rau củ'
        }
      ],
      dialogVisible: false
    };
  },
  watch: {
    isShowDialog() {
      this.form = { ...this.detail }
    }
  },
  methods: {
    clearForm() {
      this.form = {...FORM_DEFAULT}
    },
    close() {
      this.clearForm()
      this.$emit('update:isShowDialog')
      this.$emit('close-dialog')
    }
  }
};
const FORM_DEFAULT = {
  productId: '',
  productName: '',
  productCategory: '',
  productPrice: '',
  productQuantity: '',
  productDescription: '',
  productImportDate: '',
  productExpirationDate: '',
}
</script>
