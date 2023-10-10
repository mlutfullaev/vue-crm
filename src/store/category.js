import { getDatabase, ref, push, onValue, update } from 'firebase/database'

export default {
  actions: {
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categoriesRef = ref(getDatabase(), `/users/${uid}/categories`)
        return new Promise(resolve => {
          const categories = []
          onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val()
            Object.keys(data).forEach(key => {
              categories.push({ ...data[key], id: key })
            })
            resolve(categories)
          })
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const category = await push(ref(getDatabase(), `/users/${uid}/categories`), { title, limit })
        return { id: category.key, title, limit }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory ({ commit, dispatch }, { id, title, limit }) {
      try {
        const uid = await dispatch('getUid')
        await update(ref(getDatabase()), { [`/users/${uid}/categories/${id}`]: { title, limit } })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
