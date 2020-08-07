<template>
  <div class="page">
    <nav-bar></nav-bar>
    <div class="content-wrap">
      <van-index-bar>
        <van-cell title="重庆专区" />
        <van-cell title="当前城市" class="anchor" />
        <van-cell :title="getCurrentCity" />
        <van-cell title="热门城市" class="anchor" />
        <van-cell :title="hot.name" v-for="hot in hotCities" :key="hot.id" @click="toMovieList(hot)" />
        <template v-for="(item,idx) in allCountry">
          <van-index-anchor :index="item.name" :key="idx" />
          <van-cell :title="inner.name" v-for="inner in item.list" :key="inner.id" @click="toMovieList(inner)" />
        </template>
      </van-index-bar>
    </div>
  </div>
</template>
<script>
import NavBar from "@components/NavBar";
import { mapState, mapGetters, mapActions } from "vuex";
import pinyin4js from "pinyin4js";
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
    ...mapState({ movieAreaType: 'movieAreaType', hotCities: 'movieAllHotCities', allCountry: 'movieAllCountryCities', cityName: 'cityName', currentCountryCity: 'currentCountryCity' }),
    ...mapGetters(["getCurrentCity"])
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
          let data = res.data,
            firstLetter = '',
            letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase(),
            cities = letters.split('').map(item => { return { name: item, list: [] } });

          data.city.forEach(item => {
            firstLetter = pinyin4js.getShortPinyin(item.name).substr(0, 1).toUpperCase();
            let idx = letters.indexOf(firstLetter);

            cities[idx].list.push({ name: item.name, id: item.id });

          });


          me.initAllCities(cities);

        }).catch(error => {
          //movieNoNetwork(error);
          // this.hasNetwork = false;
        })

    },

    toMovieList(item) {
      let me = this;
      alert(item.name)
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

    .anchor {
      font-size: 16px;
      background: #f3f3f3;
    }
  }

}

</style>
