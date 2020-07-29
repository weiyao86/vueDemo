<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" v-click-outside='vcoConfig'>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      vcoConfig: {
        handler: this.handler,
        middleware: this.middleware,
        events: ['dblclick', 'click'],
        // Note: The default value is true, but in case you want to activate / deactivate
        //       this directive dynamically use this attribute.
        isActive: true
      }
    }
  },
  methods: {

    handler() {
      alert('outside')
    },
    middleware(event) {
      return event.target.className !== 'modal'
    }
  }
}

</script>
