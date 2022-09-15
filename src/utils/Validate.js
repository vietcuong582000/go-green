export function requiredRule(label, trigger) {
  return {
    required: true,
    message: `${label} bắt buộc`,
    trigger: trigger
  };
}
