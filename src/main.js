import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import BuyModalComponent from '@/components/Shared/BuyModal'
import fb from '@firebase/app'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'
// import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  // theme: {
  //   primary: "#f44336",
  //   secondary: "#9575CD",
  //   accent: "#9c27b0",
  //   error: "#f44336",
  //   warning: "#3949AB",
  //   info: "#2196f3",
  //   success: "#4caf50"
  // }
})
Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // подключаем бд
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyCn5t7x04WnbOMDyVlQtOqnlKwzLwXb6xE',
      authDomain: 'cepu-db.firebaseapp.com',
      databaseURL: 'https://cepu-db-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'cepu-db',
      storageBucket: 'cepu-db.appspot.com',
      messagingSenderId: '1028886220358',
      appId: '1:1028886220358:web:fd9ad96c0a57e02e17c447',
      measurementId: 'G-7CRZEVN72T'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
