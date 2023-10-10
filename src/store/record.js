import { getDatabase, ref, push } from 'firebase/database'

export default {
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        return await push(ref(getDatabase(), `/users/${uid}/records`), record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
