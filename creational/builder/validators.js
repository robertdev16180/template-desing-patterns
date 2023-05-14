
export const required = ({ message = 'field required' }) => (value) => value.trim() ? null : { required: { message } };
export const minLength = (length, message) => (value) => value.length >= length ? null : { minLength: { requiredLength: length, message } };
export const maxLength = (length, message) => (value) => value.length <= length ? null : { maxLength: { requiredLength: length, message } };
export const onlyNumber = (message) => (value) => /^\d+$/.test(value) ? null : { onlyNumber: { message } };
export const onlyLetter = (message) => (value) => /^[A-Za-z]+$/.test(value) ? null : { onlyNumber: { message } };
