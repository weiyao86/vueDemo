import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter)

const Default = {
  template: '<div class="default">default</div>'
}
const Foo = {
  template: '<div class="foo">foo</div>'
}
const Bar = {
  template: '<div class="bar" @click="$router.go(-1)">bar</div>'
}

const routes = [{
  path: '/',
  redirect: '/main/movie'
}, {
  path: '/main',
  name: 'Main',
  component: () =>
    import('@views/home/Main'),
  children: [{
    path: 'movie',
    name: 'Movie',
    component: () =>
      import('@views/home/Movie'),
    meta: {
      title: '电影',
      keepAlive: true,
      index: 0, //动画层级
      isNavBar: true
    }
  }, {
    path: 'cinema',
    name: 'Cinema',
    component: () =>
      import('@views/home/Cinema'),
    meta: {
      title: '影院',
      keepAlive: true,
      index: 1,
      isNavBar: true
    }
  }, {
    path: 'scan',
    name: 'Scan',
    component: () =>
      import('@views/home/Scan'),
    meta: {
      title: '扫码',
      keepAlive: true,
      index: 2,
      isNavBar: true
    }
  }]
}, {
  path: '/choosecity',
  name: 'ChooseCity',
  component: () =>
    import('@components/ChooseCity'),
  meta: {
    title: '选择城市',
    index: 10
  }
}, {
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ '../views/About.vue'),
  children: [{
    path: '',
    component: Default
  }, {
    path: 'foo',
    component: Foo
  }, {
    path: 'bar',
    component: Bar
  }]
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // NProgress.start();
  /*离开keepAlive组件可单独处理 */

  if (window.GlobalVue) {
    window.GlobalVue.$store.commit("removeCancelToken");
  }
  next();
});

router.afterEach(() => {
  // NProgress.done();
})

export default router
