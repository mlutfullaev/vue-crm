import store from '@/store'

export default {
  install (Vue) {
    Vue.config.globalProperties.$dateCustom = (value, format = 'date') => {
      const options = {}

      if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
      }

      if (format.includes('time')) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }

      const localeLanguage = store.getters.info.locale || 'ru-RU'
      return new Intl.DateTimeFormat(localeLanguage, options).format(new Date(value))
    }
  }
}
