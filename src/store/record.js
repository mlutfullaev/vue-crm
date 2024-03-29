import { getDatabase, ref, push, onValue, child } from 'firebase/database'

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
    },
    async fetchRecords ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const recordsRef = ref(getDatabase(), `/users/${uid}/records`)
        return new Promise(resolve => {
          const categories = []
          onValue(recordsRef, (snapshot) => {
            const data = snapshot.val() || {}
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
    async fetchRecordById ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const recordsRef = await child(ref(getDatabase()), `/users/${uid}/records/${id}`)
        return new Promise(resolve => {
          onValue(recordsRef, (snapshot) => {
            const data = snapshot.val() || {}
            resolve({ ...data, id })
          })
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
