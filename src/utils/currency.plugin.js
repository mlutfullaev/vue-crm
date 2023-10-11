export default {
  install (Vue, options) {
    Vue.config.globalProperties.$currency = (number, currency = 'RUB') => {
      return Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(number)
    }
  }
}
