<template>
  <el-dialog
    :title="title"
    :visible.sync="isShowDialog"
    width="90%"
    :top="'5vh'"
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
                :disabled="formMode === FORM_MODE.DELETE"
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
                :disabled="formMode === FORM_MODE.DELETE"
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
                :is-disable="formMode === FORM_MODE.DELETE"
                @input.native="onChangeUnitPrice(); onValidatePrice()"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Đơn vị tính" prop="unit">
              <el-input
                v-model="form.unit"
                placeholder="Đơn vị tính"
                maxlength="10"
                :disabled="formMode === FORM_MODE.DELETE"
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
                :disabled="formMode === FORM_MODE.DELETE"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Danh mục" prop="idCategory">
              <el-select style="width: 100%" :disabled="formMode === FORM_MODE.DELETE" v-model="form.idCategory" placeholder="Danh mục">
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
                :disabled="formMode === FORM_MODE.DELETE"
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
                :disabled="formMode === FORM_MODE.DELETE"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Đơn giá đã giảm" prop="discountPrice">
              <money-input
                :value.sync="form.discountPrice"
                placeholder="Đơn giá đã giảm"
                :max-length="'15'"
                :is-disable="isCheckedTiLe || formMode === FORM_MODE.DELETE"
                :prop="'productPrice'"
                :show-limit="!isCheckedTiLe"
                :clearable="false"
                @input.native="onChangeDiscountPrice(); onValidatePrice()"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="7" :md="12" :sm="12" :xs="12">
            <el-form-item label="Tỉ lệ giảm giá" prop="discount">
              <el-input
                v-model="form.discount"
                placeholder="Tỉ lệ giảm giá"
                :disabled="!isCheckedTiLe || formMode === FORM_MODE.DELETE"
                maxlength="2"
                @input="onChangeDiscount"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="5" :lg="5" :md="12" :sm="12" :xs="12">
            <el-form-item label="" label-width="0">
              <el-checkbox
                v-model="isCheckedTiLe || formMode === FORM_MODE.DELETE"
                :disabled="formMode === FORM_MODE.DELETE"
                @change="onChangeCheckbox"
              >
                Giảm giá theo tỉ lệ
              </el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Trạng thái" prop="status">
              <el-select style="width: 100%" :disabled="formMode === FORM_MODE.DELETE" v-model="form.status" placeholder="Trạng thái">
                <el-option
                  v-for="item in listTrangThai"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Ảnh sản phẩm" prop="imgUrl">
              <div style="display: flex">
                <img v-if="imgUrl" style="height: 100px; margin-right: 20px" :src="imgUrl" alt="" />
                <span v-else class="image-placeholder"></span>
                <label v-if="formMode !== FORM_MODE.DELETE" for="img-upload" class="custom-file-upload">
                  <i class="el-icon-upload" style="margin-right: 10px" />Tải lên ảnh
                </label>
                <input type="file" id="img-upload" class="input-file-button" accept="image/png, image/jpeg" @change="onChangeImg" />
              </div>
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
                :rows="3"
                :disabled="formMode === FORM_MODE.DELETE"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <span slot="footer">
      <el-button
        v-if="formMode === FORM_MODE.EDIT || formMode === FORM_MODE.CREATE"
        type="success"
        :loading="isWaitingApi"
        @click="onShowConfirm"
      >
        Lưu
      </el-button>
      <el-button
        v-if="formMode === FORM_MODE.DELETE"
        type="danger"
        :loading="isWaitingApi"
        @click="onShowConfirm"
      >
        Xóa
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
.image-placeholder {
  height: 100px;
  width: 100px;
  margin-right: 20px;
  border: dashed 2px #C0C4CC;
  display: inline-block
}

.input-file-button {
  display: none;
  align-self: center
}

.custom-file-upload {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #FFF;
  border: 1px solid #DCDFE6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: .1s;
  transition: .1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  align-self: center
}

.custom-file-upload:hover {
  color: #409EFF;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

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
import {ConstantAPI} from "@/utils/ConstantAPI";
import {errAlert, showAlert, SUCCESS} from "@/utils/Alert";
import storage from "@/firebase/firebase";

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
        unitPrice: [requiredRule('Đơn giá'), numberRule('Đơn giá'), { validator: this.validateUnitPrice, trigger: ['change', 'blur'] }],
        unit: [requiredRule('Đơn vị tính')],
        quantity: [requiredRule('Số lượng'), numberRule('Số lượng')],
        description: [requiredRule('Mô tả')],
        importDate: [requiredRule('Ngày nhập')],
        expirationDate: [requiredRule('Ngày hết hạn')],
        discount: [numberRule('Tỉ lệ giảm giá')],
        discountPrice: [numberRule('Đơn giá đã giảm'), { validator: this.validateDiscountPrice, trigger: ['change', 'blur'] }],
        status: [requiredRule('Trạng thái')],
      },
      isCheckedTiLe: true,
      listDanhMuc: [
        {
          value: 'Trái cây',
          label: 'Trái cây'
        },
        {
          value: 'Rau củ',
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
      imgUrl: '',
      file: null,
      dialogVisible: false,
      isWaitingApi: false,
      FORM_MODE
    };
  },
  watch: {
    'isShowDialog': {
      deep: true,
      handler(val) {
        if (this.formMode !== FORM_MODE.CREATE && val) {
          this.form = { ...this.detail }
          this.imgUrl = this.form.imgUrl
        }
      }
    }
  },
  methods: {
    onShowConfirm() {
      let message
      let type
      if (this.formMode === FORM_MODE.CREATE || this.formMode === FORM_MODE.EDIT) {
        message = 'Bạn có chắc chắn muốn lưu dữ liệu?'
        type = 'success'
      } else if (this.formMode === FORM_MODE.DELETE) {
        message = 'Bạn có chắc chắn muốn xóa dữ liệu?'
        type = 'warning'
      }
      this.$refs.form.validate(valid => {
        if (!valid) return false
        this.$confirm(message, '', {
          confirmButtonText: 'Có',
          cancelButtonText: 'Không',
          cancelButtonClass: 'el-icon-close',
          confirmButtonClass: 'el-icon-check',
          type: type
        }).then(() => {
          this.onSave()
        }).catch(_ => {
        })
      })
    },
    async onSave() {
      let api
      let alert
      let payload
      let param
      switch (this.formMode) {
        case FORM_MODE.CREATE:
          api = ConstantAPI[FUNCTION_CODE].CREATE
          alert = 'Thêm mới thành công sản phẩm: '
          payload = this.form
          param = ''
          break
        case FORM_MODE.EDIT:
          api = ConstantAPI[FUNCTION_CODE].UPDATE
          alert = 'Thay đổi thông tin thành công sản phẩm: '
          payload = this.form
          param = this.form.id
          break
        case FORM_MODE.DELETE:
          api = ConstantAPI[FUNCTION_CODE].DELETE
          alert = 'Xóa thành công sản phẩm: '
          payload = {}
          param = this.form.id
          break
      }
      this.isWaitingApi = true
      if(this.file) {
        const path = `/images/${this.file.name}`;
        const ref = storage.ref(path)
        await ref.put(this.file);
        this.form.imgUrl = await ref.getDownloadURL();
        this.file = null
      }
      ApiFactory.callAPI(api, payload, param).then(rs => {
        showAlert(this, SUCCESS, alert + rs.productName)
        this.close()
        this.$emit('on-success')
      }).catch(err => {
        errAlert(this, 'Có lỗi xảy ra')
      }).finally(() => {
        this.isWaitingApi = false
      })
    },
    onChangeCheckbox() {
      this.form.discount = ''
      this.form.discountPrice = ''
    },
    onChangeUnitPrice() {
      if(this.isCheckedTiLe && this.form.discount) {
        this.onChangeDiscount()
      } else if (!this.isCheckedTiLe && this.form.discountPrice) {
        this.onChangeDiscountPrice()
      }
    },
    onChangeDiscount() {
      if(!this.isCheckedTiLe || !this.form.unitPrice) {
        return
      }
      this.form.discountPrice = this.form.unitPrice - Math.round((this.form.unitPrice * this.form.discount) / 100)
    },
    onChangeDiscountPrice() {
      if(this.isCheckedTiLe || !this.form.unitPrice) {
        return
      }
      this.form.discount = 100 - Math.ceil((this.form.discountPrice / this.form.unitPrice) * 100)
      if(this.form.discount >= 100 || this.form.discount < 0) {
        this.form.discount = 0
      }
    },
    async onChangeImg(e) {
      this.file = e.target.files[0]
      this.imgUrl = URL.createObjectURL(this.file)
    },
    onValidatePrice() {
      this.$refs.form.validateField(['unitPrice', 'discountPrice'])
    },
    clearForm() {
      this.form = {...FORM_DEFAULT}
      this.$refs.form.resetFields()
      this.imgUrl = ''
      this.file = null
    },
    close() {
      this.clearForm()
      this.$emit('update:isShowDialog')
      this.$emit('close-dialog')
    },
    validateUnitPrice(rule, value, callback) {
      if (Number(this.form.unitPrice) < Number(this.form.discountPrice)) {
        callback(new Error(`Đơn giá không được nhỏ hơn Đơn giá đã giảm`))
      } else {
        callback()
      }
    },
    validateDiscountPrice(rule, value, callback) {
      if (Number(this.form.unitPrice) < Number(this.form.discountPrice)) {
        callback(new Error(`Đơn giá đã giảm không được lớn hơn Đơn giá`))
      } else {
        callback()
      }
    },
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
  status: '0',
  imgUrl: ''
}
</script>
