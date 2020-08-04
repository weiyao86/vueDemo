export default {
  name: "Movie",
  data() {
    return {
      activeName: 1,
      swiperList: [],
      cityName: '',
      navFlag: 1
    }
  },
  components: {},
  computed: {},
  created() {
    let me = this;
    me.getBannerByKey();
  },
  methods: {

    getBannerByKey() {
      let me = this;

      me.$http.post(me.$BASE_URL + "/api/shop.banner/getBannerByKey")
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

    onItemClick() {

    },

    toSearch() {},

    errorImg() {
      alert('aaaa')
    }
  }
}
