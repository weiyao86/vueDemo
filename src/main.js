import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vClick from './script/directive/v-click-index'
import { Button, Tab, Tabs, Tabbar, TabbarItem, Toast, Empty, Swipe, SwipeItem, Lazyload } from 'vant'
import VueWechatTitle from 'vue-wechat-title'
import Utils from './script/utils'

import 'vant/lib/index.css';
import 'animate.css';

//适配REM转换
import './script/adjust'


Vue.config.productionTip = false

let FastClick = require('fastclick');
FastClick.attach(document.body);
//use common ui cmp
Vue.use(VueWechatTitle);
Vue.use(vClick);
//vant ui cmp
Vue.use(Button).use(Tab).use(Tabs).use(Tabbar).use(TabbarItem).use(Toast).use(Empty).use(Swipe).use(SwipeItem).use(Lazyload, {
  loading: require("@/assets/images/loading-lazy.png"),
  error: require("@/assets/images/empty.png"),
  adapter: {
    loaded({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
      var s = 'ss';

      // do something here
      // example for call LoadedHandler
      // LoadedHandler(el)
    },
    loading(listender, Init) {
      // console.log('loading')
    },
    error(listender, Init) {
      // console.log('error')
    }
  }
});
//custom plug
Vue.use(Utils);

window.GlobalVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
