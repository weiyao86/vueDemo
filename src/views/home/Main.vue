<template>
  <div class="main-page">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if=" $route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tab-foot-menu v-if="$route.meta.isNavBar"></tab-foot-menu>
  </div>
</template>
<script>
import TabFootMenu from "@components/TabMenu.vue";
import VConsole from "vconsole";
export default {
  name: "Main",
  data() {
    return {
      obj:{}
    };
  },

  components: {
    TabFootMenu
  },
  mounted() {
    let me = this;
    new VConsole();
  },
  
  methods: {}
};
</script>
<style lang="scss">
</style>
