import Vue from 'vue';
import CommonHttp from './commonHttp';
import Methods from './methods';
import LocalStorage from './localStorage';
import Config from './config';


export default ({
  install(vue, options) {

    //定义全局方法/变量
    // Vue.myGlobalMethod=(){}

    //定义全局指令

    //定义全局过滤器
    vue.filter("httpImage", Methods['httpImage'])

    //注入组件选项
    vue.mixin({
      data() {
        return {
          transitionName: "slide-fade-left"
        };
      },
      watch: {
        //页面过渡
        $route(to, from) {
          let me = this;
          if (to.meta.index > from.meta.index) {
            me.transitionName = "slide-fade-right";
          } else {
            me.transitionName = "slide-fade-left";
          }
        }
      },
      //处理mescroll插件恢复到原有滚动位置
      beforeRouteEnter(to, from, next) {

        next(vm => {
          vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter();
        })
      },
      // 离开路由时,记录列表状态
      beforeRouteLeave(to, from, next) {
        let me = this;

        me.$refs.mescroll && me.$refs.mescroll.beforeRouteLeave();

        next();
      }
    })

    //添加实例方法
    //Vue.prototype.$myMethod=()=>{}
    let props = {};
    let commonCfg = Object.assign({}, Config, Methods, LocalStorage, CommonHttp);
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
