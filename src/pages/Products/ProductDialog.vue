<template>
  <el-dialog
    :title="title"
    :visible.sync="isShowDialog"
    width="90%"
    :close-on-click-modal="false"
    @close="close">
    <el-card shadow="never">
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" label-position="left">
        <el-row :gutter="20">
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Mã sản phẩm" prop="productId">
              <el-input
                v-model="form.productId"
                placeholder="Mã sản phẩm"
                maxlength="50"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Tên sản phẩm" prop="productName">
              <el-input
                v-model="form.productName"
                placeholder="Tên sản phẩm"
                maxlength="100"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Đơn giá" prop="unitPrice">
              <money-input
                :value.sync="form.unitPrice"
                placeholder="Đơn giá"
                :max-length="'15'"
                :prop="'productPrice'"
                :show-limit="true"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Đơn vị tính" prop="unit">
              <el-input
                v-model="form.unit"
                placeholder="Đơn vị tính"
                maxlength="10"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Số lượng" prop="quantity">
              <el-input
                v-model="form.quantity"
                placeholder="Số lượng"
                maxlength="10"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Danh mục" prop="idCategory">
              <el-select style="width: 100%" v-model="form.idCategory" placeholder="Danh mục">
                <el-option
                  v-for="item in listDanhMuc"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Ngày nhập" prop="importDate">
              <el-date-picker
                v-model="form.importDate"
                type="date"
                placeholder="Ngày nhập"
                format="dd-MM-yyyy"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Ngày hết hạn" prop="expirationDate">
              <el-date-picker
                v-model="form.expirationDate"
                type="date"
                placeholder="Ngày hết hạn"
                format="dd-MM-yyyy"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Đơn giá đã giảm" prop="discountPrice">
              <money-input
                :value.sync="form.discountPrice"
                placeholder="Đơn giá đã giảm"
                :max-length="'15'"
                :is-disable="isCheckedTiLe"
                :prop="'productPrice'"
                :show-limit="!isCheckedTiLe"
                :clearable="false"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="12">
            <el-form-item label="Tỉ lệ giảm giá" prop="discount">
              <el-input
                v-model="form.discount"
                placeholder="Tỉ lệ giảm giá"
                :disabled="!isCheckedTiLe"
                maxlength="2"
                @input="onChangeDiscount"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="6" :lg="6" :md="12" :sm="12" :xs="12">
            <el-form-item label="">
              <el-checkbox
                v-model="isCheckedTiLe"
                @change="onChangeCheckbox"
              >
                Giảm giá theo tỉ lệ
              </el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Trạng thái" prop="status">
              <el-select style="width: 100%" v-model="form.status" placeholder="Trạng thái">
                <el-option
                  v-for="item in listTrangThai"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <el-form-item label="Mô tả" prop="description">
              <el-input
                v-model="form.description"
                placeholder="Mô tả"
                type="textarea"
                maxlength="225"
                :show-word-limit="true"
                :rows="3">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <span slot="footer">
      <el-button
        type="success"
        @click="close"
      >
        Lưu
      </el-button>
      <el-button
        @click="close"
      >
        Hủy
      </el-button>
    </span>
  </el-dialog>
</template>
<style scoped>
>>> .el-textarea .el-input__count {
  bottom: -20px;
  line-height: 20px;
}
>>> .el-card__header {
  font-size: 20px
}
</style>
<script>
import MoneyInput from "../../components/Inputs/MoneyInput";
import ApiFactory from '@/utils/apiFactory'
import {FORM_MODE} from "@/utils/Constant";
import {numberRule, requiredRule} from "@/utils/Validate";

const FUNCTION_CODE = 'PRODUCT'
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
    formMode: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {...FORM_DEFAULT},
      rules: {
        productId: [requiredRule('Mã sản phẩm')],
        productName: [requiredRule('Tên sản phẩm')],
        idCategory: [requiredRule('Danh mục')],
        unitPrice: [requiredRule('Đơn giá'), numberRule('Đơn giá')],
        unit: [requiredRule('Đơn vị tính')],
        quantity: [requiredRule('Số lượng'), numberRule('Số lượng')],
        description: [requiredRule('Mô tả')],
        importDate: [requiredRule('Ngày nhập')],
        expirationDate: [requiredRule('Ngày hết hạn')],
        discount: [numberRule('Tỉ lệ giảm giá')],
        discountPrice: [numberRule('Đơn giá đã giảm')],
        status: [requiredRule('Trạng thái')]
      },
      isCheckedTiLe: true,
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
      listTrangThai: [
        {
          value: '0',
          label: 'Hoạt động'
        },
        {
          value: '1',
          label: 'Không hoạt động'
        }
      ],
      dialogVisible: false
    };
  },
  watch: {
    'isShowDialog': {
      deep: true,
      handler(val) {
        if (this.formMode !== FORM_MODE.CREATE && val) {
          this.form = { ...this.detail }
        }
      }
    }
  },
  methods: {
    onChangeCheckbox() {
      this.form.discount = ''
      this.form.discountPrice = ''
    },
    onChangeDiscount() {
      console.log(this.form.unitPrice)
      if(!this.isCheckedTiLe || !this.form.unitPrice) {
        return
      }
      this.form.discountPrice = Math.round((this.form.unitPrice * this.form.discount) / 100)
      console.log(this.form.discountPrice)
    },
    clearForm() {
      this.form = {...FORM_DEFAULT}
      this.$refs.form.resetFields()
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
  idCategory: '',
  unitPrice: '',
  unit: '',
  quantity: '',
  description: '',
  importDate: new Date(),
  expirationDate: new Date(),
  discount: '',
  discountPrice: '',
  status: '0'
}
</script>
