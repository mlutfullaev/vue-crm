import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, update } from 'firebase/database'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register ({ dispatch, commit }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password)
        const uid = await dispatch('getUid')
        const updates = {}
        updates[`/users/${uid}/info`] = {
          bill: 10000,
          name
        }
        await update(ref(getDatabase()), updates)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid () {
      const user = getAuth().currentUser
      return user ? user.uid : null
    },
    async logout () {
      await getAuth().signOut()
    }
  }
}
