export const INFO = 'info'
export const SUCCESS = 'success'
export const WARNING = 'warning'
export const ERROR = 'error'

const md5 = require('md5')
export const ERR_MSG = 'ERR_MSG'

/*
* Hàm hiển thị thông báo trên góc phải
* @param this$Message  :this.$message
* @param type : dùng constant loại thông báo
* @param message: nội dung thông báo
* @param duration: thời gian xuất hiện
* */
export function showAlert($this, type, message, duration = 4000, customClass = '') {
  const err = sessionStorage.getItem(ERR_MSG)
  const newMsg = message ? md5(message) : undefined
  if (newMsg && err !== newMsg) {
    sessionStorage.setItem(ERR_MSG, newMsg)
    setTimeout(() => {
      sessionStorage.removeItem(ERR_MSG)
    }, duration)
    message = message.replaceAll(/(\r\n|\r|\n)/g, '<br/>')
    return $this.$message({
      dangerouslyUseHTMLString: true,
      customClass: customClass,
      message: message,
      type: type,
      duration: duration,
      showClose: true
    })
  } else {
    sessionStorage.setItem(ERR_MSG, newMsg)
  }
}

export function errAlert($this, err, duration = 4000, customClass = '') {
  if (typeof err === 'string' || !err.response) {
    showAlert($this, ERROR, err, duration, customClass)
    return
  }
  if (err.response && err.response.data.name) {
    showAlert($this, ERROR, err.response.data.name, duration, customClass)
    return
  }
  if (err.response && err.response.data instanceof Blob) {
    const reader = new FileReader()
    reader.addEventListener('loadend', async (e) => {
      err.response.data = JSON.parse(e.target.result)
      errAlert($this, err, undefined, customClass)
    })
    reader.readAsText(err.response.data)
  }
  showAlert($this, ERROR, err.response ? err.response.data.message : '', duration, customClass)
}

/*
* Hàm hiển thị dialog xác nhận khi xóa
* @param this$Confirm  :this.$confirm
* @param onSuccess : function callBack khi click nút có
* */
export function showConfirmDelete(this$Confirm, onSuccess, TITLE_MESSAGE_BOX = '', CANCEL_BUTTON_BOX = '', CONFIRM_BUTTON_BOX = '') {
  return this$Confirm('Bạn có chắc chắn muốn xóa?', 'Cảnh báo', {
    confirmButtonText: 'Có',
    cancelButtonText: 'Không',
    customClass: TITLE_MESSAGE_BOX,
    cancelButtonClass: CANCEL_BUTTON_BOX,
    confirmButtonClass: CONFIRM_BUTTON_BOX,
    type: 'warning'
  })
    .then(onSuccess)
    .catch(() => {
      // doNothing
    })
}
