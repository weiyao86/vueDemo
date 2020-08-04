<template>
  <div class="main-page">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tab-foot-menu v-if="$route.meta.isNavBar"></tab-foot-menu>
  </div>
</template>
<script>
import TabFootMenu from '@components/TabMenu.vue';
import VConsole from 'vconsole';
export default {
  name: 'Main',
  data() {
    return {
      wangyiData: []
    }
  },

  components: {
    TabFootMenu
  },
  mounted() {
    let me = this;
    new VConsole();
  },
  methods: {}
}

</script>
<style lang="scss">
</style>
