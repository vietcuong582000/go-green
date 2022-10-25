<template>
  <el-input
    id="money"
    ref="ipt"
    v-model="vModel"
    :disabled="isDisable"
    :placeholder="placeholder"
    :maxlength="maxlengthText"
    @keydown.native="onKeyDown"
    @keyup.native="onInput"
    @click.native="onClick"
  >
    <span v-if="!isDisable" slot="suffix" style="margin-right: 5px">
      <span v-if="clearable" class="el-input__suffix-inner">
        <em
          class="el-input__icon el-icon-circle-close el-input__clear"
          @click="clear()"
        />
      </span>
      <span style="color: #909399; font-size: 12px">{{ vModel ? maxlengthSuffix : 0 }}/{{ maxLength }}</span>
    </span>
  </el-input>
</template>

<script>

export default {
  name: 'MoneyInputNegativeNumber',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    isDisable: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: String,
      default: '5'
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectionStart: 0,
      selectionEnd: 0
    }
  },
  computed: {
    vModel: {
      get() {
        if (this.value.toString().indexOf('-') === 0) {
          return this.value === '-' ? this.value : this.value.replace('-', '').split(',').join('').split('')
            .reverse()?.join('').match(/.{1,3}/g)?.join().split('').concat('-').reverse().join('')
        }
        return this.value.toString().split(',')?.join('').split('').reverse()?.join('').match(/.{1,3}/g)?.join().split('').reverse()?.join('')
      },
      set(value) {
        value = value.split(',')?.join('')
        value = value.replace(/^0+/, '')
        this.$emit('update:value', value)
      }
    },
    maxlengthText() {
      let text = Math.ceil(parseInt(this.maxLength) / 3) - 1 + parseInt(this.maxLength)
      if (this.vModel?.indexOf('-') === 0) {
        text = text + 1
      }
      return parseInt(text)
    },
    maxlengthSuffix() {
      const text = this.vModel?.replaceAll(',', '').replace('-', '')
      return text ? text.length : 0
    }
  },
  methods: {
    onKeyDown(e) {
      const tagDelKey = 'Backspace'

      const actionBlock = () => {
        return !(['Tab', 'Enter'].indexOf(e.key) >= 0 || (e.ctrlKey && ['v', 'a', 'c', 'x', 'z'].indexOf(e.key.toLowerCase()) >= 0))
      }

      const isNumber = () => {
        return !isNaN(Number.parseFloat(e.key))
      }
      const delay = (!e.target.delay ? 20 : new Date() - e.target.delay)

      if (!isNumber() && actionBlock() && (e.key !== tagDelKey || delay < 20)) {
        if (e.key === '-') {
          return
        } else {
          if (e.target.old && delay < 20) {
            e.target.value = e.target.old
          }
          e.target.old = null

          e.preventDefault()
        }
      } else if (e.key === tagDelKey) {
        e.target.old = e.target.value
      }
      e.target.delay = new Date()
    },
    onInput(e) {
      const input = document.getElementById('money')
      if (this.selectionStart && this.selectionEnd) {
        if (!(e.key === 'Backspace')) {
          if (this.selectionStart > 0 && this.selectionEnd > 0) {
            if (this.maxlengthSuffix % 3 === 1) {
              this.selectionStart += 1
              this.selectionEnd += 1
            }
            input.setSelectionRange(this.selectionStart + 1, this.selectionEnd + 1)
            this.selectionStart += 1
            this.selectionEnd += 1
          }
        } else {
          if (this.maxlengthSuffix % 3 === 0) {
            this.selectionStart -= 1
            this.selectionEnd -= 1
          }
          if (this.selectionStart <= 0 && this.selectionEnd <= 0) {
            input.setSelectionRange(0, 0)
          } else {
            input.setSelectionRange(this.selectionStart - 1, this.selectionEnd - 1)
            this.selectionStart -= 1
            this.selectionEnd -= 1
          }
        }
      }
    },
    onClick(e) {
      if (this.vModel) {
        this.selectionStart = e.target.selectionStart
        this.selectionEnd = e.target.selectionEnd
      }
    },
    clear() {
      const { ipt } = this.$refs
      ipt.focus()
      this.vModel = ''
      this.$emit('input', '')
      this.$emit('change', '')
    }
  }
}
</script>
