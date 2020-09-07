<template>
  <div id="transition">
    <h1>Transitions</h1>
    <!-- <ul>
      <li>
        <router-link to="/">/</router-link>
      </li>
      <li>
        <router-link to="/parent">/parent</router-link>
      </li>
      <li>
        <router-link to="/parent/foo">/parent/foo</router-link>
      </li>
      <li>
        <router-link to="/parent/bar">/parent/bar</router-link>
      </li>
    </ul> -->
    <!-- <transition name="fade" mode="out-in">
  <router-view class="view"></router-view>
</transition>
 -->
    <div class="parent">
      <h2>Parent</h2>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  created() {
    // alert('created')
  },
  beforeRouteUpdate(to, from, next) {
    alert('beforeRouteUpdate')
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  }
}

</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .75s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.child-view {
  position: absolute;
  transition: all .75s cubic-bezier(.55, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

</style>
