<template>
  <div class="wrap">
    <div class="title">title</div>
    <div class="content">
      content
      <slot>slot default</slot>
      <slot name="inner" :userInfo="userInfo"></slot>
    </div>
    <div :class="show ? '' : 'limit'">
      <div v-for="(item,idx) of info" :key="idx">
        <div v-for="item of covertArray(item.logit)" :key="item">{{item}}{{reversew(item)}}</div>
      </div>
    </div>
    <div class="footer">
      <button>Cancel</button>
      <button @click="changeShow">Confirm</button>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'CustomDialog',
  props: {
    info: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      show: false,
      userInfo: {
        name: 'SoulMan',
        nickName: 'soul'
      }
    }
  },

  computed: {
    reversew(item) {
      return item => {
        return item + '======' + item
      };
    }
  },
  watch: {
    info() {
      console.log('***')
    }
  },
  methods: {
    init() {
      console.log("init methods");
    },
    covertArray(item) {
      let me = this;
      let arr = [];
      if (item && item.length) {
        arr = [...item] || [];
      }
      console.log(arr);
      return arr.reverse();

    },

    changeShow() {
      this.show = !this.show;
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

.limit {
  height: 40px;
  border: 1px solid #f00;
}

</style>
