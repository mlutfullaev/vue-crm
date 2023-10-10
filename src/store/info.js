import { getDatabase, ref, onValue, update } from 'firebase/database'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo ({ commit, dispatch, getters }, news) {
      try {
        const uid = await dispatch('getUid')
        const updateData = { ...getters.info, ...news }
        await update(ref(getDatabase()), { [`/users/${uid}/info`]: updateData })
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const dbRef = await ref(getDatabase(), `/users/${uid}/info`)
        onValue(dbRef, snapshot => {
          const info = snapshot.val()
          commit('setInfo', info)
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
