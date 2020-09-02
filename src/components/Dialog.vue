<template>
  <div class="wrap">
    <div class="title">title</div>
    <div class="content">
      content
      <slot>slot default</slot>
      <slot name="inner" :userInfo="userInfo"></slot>
    </div>
    <div class="footer">
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'CustomDialog',
  data() {
    return {
      userInfo: {
        name: 'SoulMan',
        nickName: 'soul'
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log("init methods");
    }
  }
}

</script>
<style lang="scss" scoped>
.wrap {
  box-shadow: 0 0 15px rgba(0, 0, 0, .5);
  border: 1px solid #f1f;
  padding: 20px;
}

</style>
