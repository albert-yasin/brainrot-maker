export const required = (value) => !!value || 'This field is Required'
export const requiredNoMsg = (value) => !!value || ''
export const minLength = (min) => (value) =>
  (value && value.length >= min) || `Minimum length is ${min} characters`
export const maxValue = (max) => (value) =>
  value <= max || `Maximum value is ${max} seconds`
export const minValue = (min) => (value) =>
  value >= min || `Minimum value is ${min} seconds`
