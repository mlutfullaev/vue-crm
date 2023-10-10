import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

export default createStore({
  state: {
    error: null
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency () {
      // const key = process.env.VUE_APP_FIXER
      // const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      // return await res.json()
      const res = {
        date: '2023-10-08',
        rates: {
          USD: 1.6,
          EUR: 1,
          RUB: 107.07
        }
      }
      return res
    }
  },
  modules: {
    auth,
    info,
    category,
    record
  }
})
