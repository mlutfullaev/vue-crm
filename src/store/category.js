import { getDatabase, ref, push } from 'firebase/database'

export default {
  actions: {
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const category = await push(ref(getDatabase(), `/users/${uid}/categories`), { title, limit })
        return { id: category.key, title, limit }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
