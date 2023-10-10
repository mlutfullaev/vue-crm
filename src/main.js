import { createApp } from 'vue'
import firebase from 'firebase/compat/app'
import VueAwesomePaginate from 'vue-awesome-paginate'
import { getAuth } from 'firebase/auth'
import App from './App.vue'
import Loader from '@/components/app/Loader.vue'
import router from './router'
import store from './store'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

firebase.initializeApp({
  apiKey: 'AIzaSyAiNy2HnXIj_MmfygdVKXB9-l1j-dMaNOM',
  authDomain: 'vue-crm-ml.firebaseapp.com',
  projectId: 'vue-crm-ml',
  storageBucket: 'vue-crm-ml.appspot.com',
  messagingSenderId: '161279965685',
  appId: '1:161279965685:web:67098b8c0ff2ec8ab088bc',
  measurementId: 'G-PQJPTMXVLS'
})

let app
getAuth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(store)
    app.use(router)
    app.use(messagePlugin)
    app.directive('tooltip', tooltipDirective)
    app.component('Loader', Loader)
    app.use(VueAwesomePaginate)
    app.mount('#app')
  }
})
