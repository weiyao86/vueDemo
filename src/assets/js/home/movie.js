import MescrollVue from "mescroll.js/mescroll.vue";
import { mapState } from "vuex";

export default {
  name: "Movie",
  data() {
    return {
      activeName: 0,
      swiperList: [],
      navFlag: 1,
      type: 1, // 1是热映2是待映
      movieList: [], //电影列表
      mescroll: null,
      mescrollDown: {},
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 10,
          empty: {
            wrapId: '',
            tip: '暂无相关数据'
          }
        }
      },
      pageNum: 1,
      limit: 10
    }
  },
  components: {
    MescrollVue
  },
  computed: {
    ...mapState(["cityId", "cityName"])
  },
  created() {
    let me = this;
    me.getBannerByKey();
  },
  methods: {

    mescrollInit(mescroll) {
      let me = this;
      me.mescroll = mescroll;
    },

    upCallback(page, mescroll) {
      let me = this;

      me.pageNum = page.num;
      let params = {
        cityId: me.cityId,
        offset: (me.pageNum - 1) * me.limit,
        limit: me.limit,
        movieType: me.type
      };

      me.$http.get("/ajax/mw/movie/list_1", { params: params }).then(rst => {
        let curData = rst.data.movie;
        if (me.pageNum == 1) {
          me.movieList = [];
        }

        me.movieList = [...me.movieList, ...curData];
        me.mescroll.endBySize(curData.length, rst.data.movieTotal);
      }).catch(error => me.mescroll.endErr());

    },

    getBannerByKey() {
      let me = this;

      me.$http.post("/api/shop.banner/getBannerByKey")
        .then(res => {
          let data = res.data;
          if (data) {
            let result = data.result;

            if (result.length) {
              me.swiperList = [];
              result.forEach((item, index) => {
                // 首页banner广告
                if (item.key == "banner") {
                  item.img = me.$httpImage(item.img);
                  console.log(item.img)
                  me.swiperList.push(item);
                }
              });
              // me.swiperList.length = 1;
            }
          } else {

          }
        })
        .catch(error => {
          console.log("错误");
          console.log(error);
        });
    },

    onItemClick(idx) {
      let me = this;

      me.type = idx == 0 ? 1 : 2;
      me.mescroll.resetUpScroll();

    },

    toSearch() {},

    // 选择影院
    goChooseCinema(item) {
      return alert('choose')
      // mao vs wanda id vs wd_id
      if (item.wd_id != 0) {
        this.$router.push({
          path: "/movie/chooseCinema_wd",
          query: {
            wandaId: item.wd_id,
            movieName: item.name,
            movieId: item.id
          }
        });
      } else {
        this.$router.push({
          path: "/movie/chooseCinema",
          query: {
            movieId: item.id,
            movieName: item.name,
            wandaId: item.wd_id
          }
        });
      }
    }
  }
}
