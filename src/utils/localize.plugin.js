import store from '@/store'
import ru from './locales/ru.json'
import en from './locales/en.json'

const locales = {
  'ru-RU': ru,
  'en-US': en
}
export default {
  install (Vue, options) {
    Vue.config.globalProperties.$localize = (text) => {
      const localeLanguage = store.getters.info.locale || 'ru-RU'
      return locales[localeLanguage][text] || '[Localize error]: text not found'
    }
  }
}
