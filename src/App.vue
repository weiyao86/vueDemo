<template>
  <div id="app">
     <transition :name="transitionName">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>
<script>
export default ({
  name: 'App'

})

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
