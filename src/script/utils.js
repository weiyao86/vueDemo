import Vue from 'vue';
import CommonHttp from './commonHttp';
import Methods from './methods';

export default ({
  install(vue, options) {
    debugger;
    //定义全局方法
    // Vue.myGlobalMethod=(){}

    //定义全局指令

    //定义全局过滤器

    //注入组件选项
    // Vue.mixin({
    // 	created(){}
    // })

    //添加实例方法
    //Vue.prototype.$myMethod=()=>{}
    let props = {};
    //请求
    props['$http'] = {
      get() {
        return CommonHttp;
      }
    }

    Object.keys(Methods).forEach((key, val) => {
      props["$" + key] = {
        get() {
          return val;
        }
      }
    })

    Object.defineProperties(Vue.prototype, prop);


  }
})
