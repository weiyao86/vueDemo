<template>
  <div class="main-page">
    <transition name="slide-fade">
      <keep-alive>
        <router-view v-if=" $route.meta.keepAlive">
        </router-view>
      </keep-alive>
    </transition>
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
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s ease;
}

.slide-fade-enter {
  transform: translateX(-100vw);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100vw);
  opacity: 0;
}

</style>
