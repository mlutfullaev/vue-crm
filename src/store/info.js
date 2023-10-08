import { getDatabase, ref, onValue } from 'firebase/database'

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
    async fetchInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const dbRef = await ref(getDatabase(), `/users/${uid}/info`)
        onValue(dbRef, snapshot => {
          const info = snapshot.val()
          commit('setInfo', info)
        })
      } catch (e) {
        console.error(e.message)
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
