import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import { VuePlausible } from 'vue-plausible'

Vue.config.productionTip = false

Vue.use(VuePlausible, {
  domain: "peopleindresden.de"
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
