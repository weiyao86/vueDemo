const keys = {
  lng: 'lng', //经度
  lat: 'lat', //纬度
};

let Cache = {
  setStorage: (key, val) => {
    if (!localStorage) {
      return console.log('不支持此方法!');
    }
    if (keys[key]) {
      localStorage.setItem(key, val);
    } else {
      console.log(`请正确配置存储set:${key}值!`);
    }
  },
  getStorage: (key) => {
    if (!localStorage) {
      return console.log('不支持此方法!');
    }

    if (keys[key]) {
      localStorage.getItem(key);
    } else {
      console.log(`请正确配置存储get:${key}值!`);
    }
  },
  rmStorage: key => {
    localStorage.removeItem(key);
  }
};

export default Cache;
