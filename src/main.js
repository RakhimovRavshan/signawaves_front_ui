import Vue from 'vue'
import './plugins/vuetify'
import './plugins/router'
import './plugins/vuex'
import App from './App.vue'
import routes from './routes'
import VueRouter from 'vue-router'
import { store } from './store/store';

Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
