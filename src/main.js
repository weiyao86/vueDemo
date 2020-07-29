import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vClick from './script/directive/v-click-index'
import Utils from './script/utils'
// import vClickOutside from 'v-click-outside'

Vue.config.productionTip = false
console.log(vClick)
// Vue.use(vClickOutside)
Vue.use(vClick)
Vue.use(Utils);

window.GlobalVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
