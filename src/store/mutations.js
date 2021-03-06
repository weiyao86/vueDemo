export default {

  // 缓存异步请求
  setCancelToken(state, cancel) {
    state.cancelTokenList.push(cancel);
  },

  // 取消未完成异步请求
  removeCancelToken(state, opts) {
    for (let i = state.cancelTokenList.length - 1; i >= 0; i--) {
      state.cancelTokenList[i].call(null, '取消中。。。');
      state.cancelTokenList.splice(i, 1);
    }
    console.log(state.cancelTokenList)
  },

  //设置经纬度
  setLngAndLat(state, opts) {
    state.lng = opts.lng;
    state.lat = opts.lat;
  },

  //设置当前城市类型
  chooseMovieAreaType(state, type) {
    //重庆与全国  1/2

    state.movieAreaType = type;

  },
  //热门城市,全国城市
  initAllCities(state, data) {
    state.movieAllCountryCities = data;
    state.movieAllHotCities = [{
      id: 1,
      name: '北京'
    }, {
      id: 10,
      name: '上海'
    }, {
      id: 50,
      name: '杭州'
    }, {
      id: 20,
      name: '广州'
    }, {
      id: 30,
      name: '深圳'
    }, {
      id: 45,
      name: '重庆'
    }, {
      id: 59,
      name: '成都'
    }, {
      id: 55,
      name: '南京'
    }, {
      id: 80,
      name: '苏州'
    }, {
      id: 57,
      name: '武汉'
    }, {
      id: 42,
      name: '西安'
    }];
  }
}
