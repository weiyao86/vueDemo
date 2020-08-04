import Vue from 'vue';
import CommonHttp from './commonHttp';
import Methods from './methods';
import Config from './config';


export default ({
  install(vue, options) {

    //定义全局方法/变量
    // Vue.myGlobalMethod=(){}

    //定义全局指令

    //定义全局过滤器

    //注入组件选项
    // Vue.mixin({
    //  created(){}
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

    //通用静态方法/全局变量
    let commonCfg = Object.assign({}, Config, Methods);
    let cfg = Object.keys(commonCfg);
    cfg.forEach((key, val, obj) => {

      props["$" + key] = {
        get() {
          return commonCfg[key];
        }
      }
    });

    Object.defineProperties(Vue.prototype, props);

  }
})
