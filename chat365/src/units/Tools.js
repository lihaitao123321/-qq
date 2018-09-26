//axios请求
import axios from 'axios';
import {MessageBox} from 'mint-ui';
import {Toast} from 'mint-ui';
var timer;
class $API {
  axios (obj,hideToast) {
    var userInfo = this.getlocJson('userInfo');
    var sid, sign;
    if (!this.isEmpty(userInfo)) {
      sid = userInfo.sid || '';
      sign = userInfo.sub_unit_num_id || '';
    } else {
      sid = '';
      sign = '';
    }
    var time = this.TimeFormat(new Date().getTime(), 'rf');
    // var url = "http://" + (this.getlocJsonStr("serverUrl") ? this.getlocJsonStr("serverUrl") : "47.96.117.176:8080") + "/gateway?app_key=6001&method=" + obj.method + "&sign=" + sign + "&sid=" + sid + "&timestamp=" + time + "&params=" + base64;
    var url = "http://" + (this.getlocJsonStr("serverUrl") ? this.getlocJsonStr("serverUrl") : "47.96.117.176:8080") + "/gateway";
    url = url.replace(/\s/, '');
    let postData = new URLSearchParams();
    postData.append("app_key", 6000);
    postData.append("method", obj.method);
    postData.append("sid", sid);
    postData.append("sign", sign);
    postData.append("timestamp", time);
    postData.append("params", Base64.encode(JSON.stringify(obj.data)));
    //等待弹框处理
    if (this.isEmpty(hideToast)) {
      clearTimeout(timer);
      document.getElementById("aytwdhfsgafy").style.display = "flex";
      timer = setTimeout(function () {
        document.getElementById("aytwdhfsgafy").style.display = "none";
      }, 80000)
    }
    axios.post(url,postData)
      .then(function (response) {
        if (response.data.code != 0) {
          if (response.data.code == -20050) {
            MessageBox.alert('登录授权已过期，请重新登陆!').then(action => {
              router.push({path: '/Login'});
            });
          } else {
            Toast(response.data.message);
          }
        }
        obj.success(response);
        timer = setTimeout(function () {
          document.getElementById("aytwdhfsgafy").style.display = "none";
        }, 200)
      })
      .catch(function (err) {
        console.log(err)
        obj.error(err);
        timer = setTimeout(function () {
          document.getElementById("aytwdhfsgafy").style.display = "none";
        }, 500)
      });
  }
  $ajax(obj, hideToast) {
    var userInfo = this.getlocJson('userInfo');
    var sid, sign;
    if (!this.isEmpty(userInfo)) {
      sid = userInfo.sid || '';
      sign = userInfo.sub_unit_num_id || '';
    } else {
      sid = '';
      sign = '';
    }
    var time = this.TimeFormat(new Date().getTime(), 'rf');
    // var url = "http://" + (this.getlocJsonStr("serverUrl") ? this.getlocJsonStr("serverUrl") : "47.96.117.176:8080") + "/gateway?app_key=6001&method=" + obj.method + "&sign=" + sign + "&sid=" + sid + "&timestamp=" + time + "&params=" + base64;
    var url = "http://" + (this.getlocJsonStr("serverUrl") ? this.getlocJsonStr("serverUrl") : "47.96.117.176:8080") + "/gateway";
    url = url.replace(/\s/, '');
    var postData={};
    postData.app_key=6000;
    postData.method=obj.method;
    postData.sid=sid;
    postData.sign=sign;
    postData.timestamp=time;
    postData.params=Base64.encode(JSON.stringify(obj.data));
    for (var item in postData) {
      if (!this.isEmpty(postData[item]) && typeof (postData[item]) == 'object') {
        postData[item] = encodeURIComponent(JSON.stringify(postData[item]));
      }
    }
    var params = {
      'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
      url: url,
      method: 'post',
      params:postData
    };
    //等待弹框处理
    if (this.isEmpty(hideToast)) {
      clearTimeout(timer);
      document.getElementById("aytwdhfsgafy").style.display = "flex";
      timer = setTimeout(function () {
        document.getElementById("aytwdhfsgafy").style.display = "none";
      }, 80000)
    }
    axios(params)
      .then(function (response) {
        if (response.data.code != 0) {
          if (response.data.code == -20050) {
            MessageBox.alert('登录授权已过期，请重新登陆!').then(action => {
              router.push({path: '/Login'});
            });
          } else {
            Toast(response.data.message);
          }
        }
        obj.success(response);
        timer = setTimeout(function () {
          document.getElementById("aytwdhfsgafy").style.display = "none";
        }, 200)
      })
      .catch(function (err) {
        console.log(err)
        obj.error(err);
        timer = setTimeout(function () {
          document.getElementById("aytwdhfsgafy").style.display = "none";
        }, 500)
      });
  }
  setlocJson(key, value) {
    if (typeof(value) == "object" && value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value)
  }

  getlocJsonStr(key) {
    return localStorage.getItem(key);
  }

  getlocJson(key) {
    var loc = localStorage.getItem(key);
    if (typeof(loc) == "string" && loc && loc.length > 0) {
      loc = JSON.parse(loc);
    }
    return loc;
  }

  removelocJson(key) {
    localStorage.removeItem(key);
  }

  //time-时间戳
  TimeFormat(time, id) {
    //y=年;ymd=年月日;ymdhm年月日时分;ymdhms年月日时分秒
    var datetime = new Date(parseInt(time));
    //datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var month2 = datetime.getMonth() + 1 < 10 ? datetime.getMonth() + 1 : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var date2 = datetime.getDate() < 10 ? datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    if (id == "y") {
      return year;
    } else if (id == "ym") {
      return year + "-" + month;
    } else if (id == "ymd") {
      return year + "-" + month + "-" + date;
    } else if (id == "ymd2") {
      return year + "年" + month + "月" + date + "日";
    } else if (id == "ymdhm") {
      return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    } else if (id == "ymdhms") {
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    } else if (id == "ymdhms2") {
      return year + "-" + month + "-" + date + "-" + hour + "-" + minute + "-" + second;
    } else if (id == "mdhms") {
      return month + "-" + date + " " + hour + ":" + minute + ":" + second;
    } else if (id == "md") {
      return month + "-" + date;
    } else if (id == "hm") {
      return hour + ":" + minute;
    } else if (id == "xs") {
      return hour + ":" + hour;
    } else if (id == "md2") {
      return month2 + "月" + date2 + "日";
    } else if (!id) {
      return year + "-" + month + "-" + date;
    } else if (id == "mdhm") {
      return month + "-" + date + " " + hour + ":" + minute;
    } else if (id == "md3") {
      //仿微信
      return "<span>" + month2 + "  </span><span style='font-size:.7em;'>" + date2 + "日</span>";
    } else if (id == "rf") {
      return year + month + date + hour + minute + second;
    }
  }

  //检测字段是否为空
  isEmpty(data) {
    if (data == "" || data == null || data == undefined || data == "undefined" || data == 0 || data == "0") {
      return true;
    } else {
      return false;
    }
  }

  deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          //判断ojb子元素是否为对象，如果是，递归复制
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = this.deepClone(obj[key]);
          } else {
            //如果不是，简单复制
            objClone[key] = obj[key];
          }
        }
      }
    }
    return objClone;
  }

}

export default new $API();

