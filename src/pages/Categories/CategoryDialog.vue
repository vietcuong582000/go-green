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
            <el-form-item label="Mã danh mục">
              <el-input v-model="form.code" placeholder="Mã danh mục"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
            <el-form-item label="Tên danh mục">
              <el-input v-model="form.name" placeholder="Tên danh mục"></el-input>
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

<script>
import MoneyInput from "../../components/Inputs/MoneyInput";
import {FORM_MODE} from "@/utils/Constant";
import {ConstantAPI} from "@/utils/ConstantAPI";
import storage from "@/firebase/firebase";
import ApiFactory from "@/utils/apiFactory";
import {errAlert, showAlert, SUCCESS} from "@/utils/Alert";

const FUNCTION_CODE = 'CATEGORY'
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
      dialogVisible: false,
      FORM_MODE,
      isWaitingApi: false
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
          alert = 'Thêm mới thành công danh mục: '
          payload = this.form
          param = ''
          break
        case FORM_MODE.EDIT:
          api = ConstantAPI[FUNCTION_CODE].UPDATE
          alert = 'Thay đổi thông tin thành công danh mục: '
          payload = this.form
          // param = this.form.id
          break
        case FORM_MODE.DELETE:
          api = ConstantAPI[FUNCTION_CODE].DELETE
          alert = 'Xóa thành công danh mục: '
          payload = {}
          param = { id: this.form.id }
          break
      }
      this.isWaitingApi = true
      ApiFactory.callAPI(api, payload, param).then(rs => {
        showAlert(this, SUCCESS, alert + this.form.name)
        this.close()
        this.$emit('on-success')
      }).catch(err => {
        errAlert(this, 'Có lỗi xảy ra')
      }).finally(() => {
        this.isWaitingApi = false
      })
    },
    clearForm() {
      this.form = {...FORM_DEFAULT}
      this.$refs.form.resetFields()
    },
    close() {
      this.clearForm()
      this.$emit('update:isShowDialog')
      this.$emit('close-dialog')
    },
  }
};
const FORM_DEFAULT = {
  code: '',
  name: ''
}
</script>
