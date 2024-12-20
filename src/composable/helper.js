export const onFocus = (event) => {
  if (event.target.value === '0') {
    event.target.value = ''
  }
}

export const onBlur = (event) => {
  if (event.target.value === '') {
    event.target.value = '0'
  }
}
