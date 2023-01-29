export function requiredRule(label, trigger) {
  return {
    required: true,
    message: `${label} bắt buộc`,
    trigger: trigger
  };
}

export function numberRule(label, trigger) {
  return {
    validator: (_rule, value, cb) => {
      if (value && isNaN(value)) {
        cb(new Error(`${label} là kiểu số`))
      } else {
        cb()
      }
    },
    trigger: trigger || ['change', 'blur']
  };
}

export function phoneRule(label, trigger) {
  return {
    validator: (_rule, value, cb) => {
      const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
      if(!value.match(regexPhoneNumber)) {
        cb(new Error(`${label} không đúng định dạng`))
      } else {
        cb()
      }
    },
    trigger: trigger || ['change', 'blur']
  };
}

export function emailRule(label, trigger) {
  return {
    validator: (_rule, value, cb) => {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if(!value.match(regexEmail)) {
        cb(new Error(`${label} không đúng định dạng`))
      } else {
        cb()
      }
    },
    trigger: trigger || ['change', 'blur']
  };
}
