import localStorage from "./localStorage";
import store from "../store";

let methods = {
  dateFormat(date, format) {

    if (!date) {
      date = new Date();
    }
    if (!format) {
      format = 'yyyy-MM-dd';
    }
    //Date format
    let o = {
      "M+": date.getMonth() + 1, //month 
      "d+": date.getDate(), //day 
      "h+": date.getHours(), //hour 
      "m+": date.getMinutes(), //minute 
      "s+": date.getSeconds(), //second 
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter 
      "S": date.getMilliseconds() //millisecond 
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  },
  numAdd(num, num1) {

    var r1, r2, m;
    try {
      r1 = num.toString().split(".")[1].length
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num1.toString().split(".")[1].length
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (num * m + num1 * m) / m;
  },
  // 图片前缀
  httpImage(imgSrc) {
    if (!imgSrc) {
      return "";
    }


    if (!imgSrc.match(/http(s)?\:\/\//ig)) {
      if (imgSrc.indexOf('.gif') > -1) {
        imgSrc = "http://static.xinyingtong.cn/" + imgSrc;
      } else
        imgSrc = `https://static.xinyingtong.cn/${imgSrc}?x-oss-process=style/mobile`;
    }

    return imgSrc;
  },

  initLocation(cb) {
    let me = this;

    //百度
    // var bgeo = new BMap.Geolocation();
    // bgeo.getCurrentPosition(function(result) {
    //   console.log('【Bmap】', result);
    //   // debugger;
    //   // 开启SDK辅助定位
    //   bgeo.enableSDKLocation();
    // });

    //高德
    AMap.plugin('AMap.Geolocation', function() {
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10 * 1000,
        GeoLocationFirst: true,
        maximumAge: 0,
        useNative: true,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        buttonPosition: 'RB'
      });

      geolocation.getCurrentPosition((status, rst) => {
        //精准定位容易失败
        console.log('高德地图精准定位', status, rst);
      });

      //城市定位
      geolocation.getCityInfo(function(status, rst) {
        if (status == "complete" && rst.info === "SUCCESS") {
          let lng = rst.center[0],
            lat = rst.center[1];
          localStorage.setStorage('lng', rst.center[0]);
          localStorage.setStorage('lat', rst.center[1]);
          console.log('高德地图城市定位成功', status, rst);

          store.commit("setLngAndLat", {
            lng: lng,
            lat: lat
          });
          console.log('-----------------------------------------');
        }
        if (typeof cb == "function") {
          cb.call(null, rst);
        }
      });

      // AMap.event.addListener(geolocation, 'complete', function(data) {
      //   data.position.getLng();
      //   data.position.getLat();
      //   console.log('获取当前位置成功!')
      // })
      // AMap.event.addListener(geolocation, 'error', function(data) {
      //   if (data.info == 'FAILED') {
      //     console.log('获取当前位置失败!')
      //   }
      // })

    });
  }
};
export default methods;
