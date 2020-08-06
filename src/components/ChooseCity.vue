<template>
  <div class="page">
    <nav-bar></nav-bar>
    <div class="content-wrap">
      <van-index-bar :index-list="['当前','热门','A','B','C']">
        <van-cell title="重庆专区" />
        <van-index-anchor>当前城市</van-index-anchor>
        <van-cell title="上海" />
        <van-index-anchor index="热门城市" />
        <van-cell :title="hot.name" v-for="hot in hotCities" :key="hot.id" />
        <van-index-anchor index="A" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-index-anchor index="B" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell :title="item" v-for="item in [1,2,3,4,5,6,7,87,4,3,23,3,1,2,3,12,123,12,321,132,123,132,4]" :key="item"></van-cell>
      </van-index-bar>
    </div>
  </div>
</template>
<script>
import NavBar from "@components/NavBar";
import { mapState, mapActions } from "vuex";
export default {
  name: 'ChooseCity',
  data() {
    return {

    }
  },
  components: {
    NavBar
  },
  computed: {
    ...mapState({ hotCities: 'movieAllHotCities' })
  },
  mounted() {
    let me = this;
    me.getMoiveCities(); //获取猫眼城市列表
  },
  methods: {

    ...mapActions(['initAllCities']),

    getMoiveCities() {
      let me = this;
      me.$http.get("/ajax/mao/city/list")
        .then(res => {
          let data = res.data;

          me.initAllCities(data);

        }).catch(error => {
          //movieNoNetwork(error);
          // this.hasNetwork = false;
        })

    }

  }
}

</script>
<style lang="scss" scoped>
.content-wrap {

  /deep/ .van-index-bar {
    &__index--active {
      color: #1c8ef0;
    }

    .van-cell {
      line-height: 18px;
      font-size: 14px;

      &:after {
        left: 0;
        right: 0;
      }
    }

    .van-index-anchor {
      font-size: 16px;
      background: #f3f3f3;
      line-height: 38px;

      &--sticky {
        color: #1c8ef0;
      }
    }
  }

}

</style>
