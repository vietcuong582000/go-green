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
