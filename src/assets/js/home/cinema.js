import MescrollVue from "mescroll.js/mescroll.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Cinema",
  data() {
    return {
      activeName: 0,
      swiperList: [],
      navFlag: 1,
      type: 1, // 1是热映2是待映
      cinemaSearchVal: "",
      movieList: [], //电影列表
      cniemaList: [], //影院列表
      mescroll: null,
      mescrollDown: {},
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 10,
          empty: {
            wrapId: "",
            tip: "暂无相关数据"
          }
        }
      },
      mescrollCinema: null,
      mescrollCinemaDown: {},
      mescrollCinemaUp: {
        callback: this.upCinemaCallback,
        page: {
          num: 0,
          size: 10,
          empty: {
            wrapId: "",
            tip: "暂无相关数据"
          }
        }
      },
      pageNum: 1,
      limit: 10,
      cinemaPageNum: 1,
      cinemaLimit: 10
    };
  },
  filters: {
    formDistance: val => {
      if (!val) return;
      let ds = ">1000km";
      val > 0 && val <= 1000 && (ds = val + "km");
      val >= 0 && val <= 1 && (ds = val * 1000 + "m");

      return ds;
    }
  },
  components: {
    MescrollVue
  },
  computed: {
    ...mapState(["cityId", "cityName", "movieAreaType", "lng", "lat"]),
    ...mapGetters(["getCurrentCity"])
  },

  created() {},

  mounted() {
    let me = this;
    console.log("cinema....");
    me.getBannerByKey();
    me.initLocation();
  },
  methods: {
    ...mapMutations(["chooseMovieAreaType"]),

    initLocation() {
      let me = this;
      me.$initLocation(rst => {
        console.log(rst);
      });
    },

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

      me.$http
        .get("/ajax/mw/movie/list_1", { params: params })
        .then(rst => {
          let curData = rst.data.movie;
          if (me.pageNum == 1) {
            me.movieList = [];
          }

          me.movieList = [...me.movieList, ...curData];
          me.mescroll.endBySize(curData.length, rst.data.movieTotal);
        })
        .catch(error => me.mescroll.endErr());
    },

    mescrollCinemaInit(mescrollCinema) {
      let me = this;
      me.mescrollCinema = mescrollCinema;
    },

    upCinemaCallback(page, mescroll) {
      let me = this;

      me.cinemaPageNum = page.num;
      let params = {
        cityId: me.cityId,
        offset: (me.cinemaPageNum - 1) * me.cinemaLimit,
        limit: me.cinemaLimit,
        longitude: me.lng,
        latitude: me.lat,
        districtId: "",
        cinemaName: me.cityName,
        enter: "dianying"
      };

      me.$http
        .get("/ajax/mw/cinema/filter_1", { params: params })
        .then(rst => {
          console.log("******************************************");

          let curData = rst.data.cinema;
          if (me.cinemaPageNum == 1) {
            me.cniemaList = [];
          }
          me.cniemaList = [...me.cniemaList, ...curData];

          me.mescrollCinema.endBySize(curData.length, rst.data.cinemaTotal);
        })
        .catch(error => me.mescrollCinema.endErr());
    },

    getBannerByKey() {
      let me = this;

      me.$http
        .post("/api/shop.banner/getBannerByKey")
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
                  console.log(item.img);
                  me.swiperList.push(item);
                }
              });
              // me.swiperList.length = 1;
            }
          } else {}
        })
        .catch(error => {
          console.log("错误");
          console.log(error);
        });
    },

    onChangeTab(name, title) {
      let me = this;
      me.navFlag = name;
    },

    //搜索影院
    onSearch() {},

    toChooseCity() {
      let me = this;
      me.chooseMovieAreaType(1);
      me.$router.push({
        path: "/choosecity"
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
      return alert("choose");
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
};
