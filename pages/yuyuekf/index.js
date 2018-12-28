var dateTimePicker = require('../../utils/dateTimePicker.js');
var util = require('../../utils/util.js');
const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    jieguo:'请选择预约时间',
    imgurl: app.data.imgurl,
    href: app.data.href,
    VerifyCode: '验证码',
    zcbtn: 1,
    hqdyzm: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var DATE = util.formatDate(new Date());
    console.log(DATE)
    let date = DATE.split(' ')
    let year = date[0].split('-')
    that.setData({
      date: date[0],
      time: date[1],
      startYear: year[0],
      endYear: parseInt(year[0])+10,
      dqtime: DATE,
      id: options.id
    })
    console.log(date)
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // changeDate(e) {
  //   this.setData({ date: e.detail.value });
  // },
  // changeTime(e) {
  //   this.setData({ time: e.detail.value });
  // },
  // changeDateTime(e) {
  //   this.setData({ dateTime: e.detail.value });
  // },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  // changeDateTimeColumn(e) {
  //   var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

  //   arr[e.detail.column] = e.detail.value;
  //   dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

  //   this.setData({
  //     dateTimeArray: dateArr,
  //     dateTime: arr
  //   });
  // },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    console.log(dateArr)
    console.log(arr)
    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr,
      jieguo:'选择了'
    });
  },
  // 获取手机号
  hqphone: function (e) {
    var that = this
    let phone = e.detail.value
    that.setData({
      phone: phone
    })
  },
  // huo名字
  hqname: function (e) {
    var that = this
    let name = e.detail.value
    that.setData({
      name: name
    })
  },
  // 获取验证码
  hqyzm: function (e) {
    var that = this
    let yzm = e.detail.value
    that.setData({
      yzm: yzm
    })
  },
  // 获取密码
  hqpwd: function (e) {
    var that = this
    console.log(e)
    let pwd = e.detail.value
    console.log(pwd)
    that.setData({
      pwd: pwd
    })
  },

  huoquyzm() {
    var that = this
    let phone = that.data.phone
    if (phone == '' || phone == undefined || phone == null) {
      wx.showToast({
        title: '请先填写手机号',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (!phoneRexp.test(phone)) {
      wx.showToast({
        title: '手机号格式有误！',
        icon: 'none',
        duration: 1500,
      })
      return

    }
    let zcbtn = that.data.zcbtn
    if (zcbtn == 2) {
      return
    }
    let requestCheck = phone
    console.log(phone)
    wx.showLoading({
      title: '发送中',
    })
    wx.request({
      url: 'http://api.86qyt.com/api/Login/PostVerify',
      method: 'post',
      data: {
        phone: phone,
        Account: 'IOSAdmin',
        Token: '601FD06CA5C9417394334F77F72F7735',
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == '1') {
          that.setData({
            hqdyzm: res.data.data
          })
          var total_micro_second = 59;
          count_down(that, total_micro_second);
          wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
          })
        }
      },
      complete:function(){
        wx.hideLoading()
      }

    })



  },
  submit: function () {
    var that = this
    let phone = that.data.phone
    let name = that.data.name
    let yzm = that.data.yzm
    let dateTimeArray1 = that.data.dateTimeArray1
    let dateTime1 = that.data.dateTime1
    let xztime = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' +dateTimeArray1[4][dateTime1[4]]
    var date = new Date(xztime);
    // 有三种方式获取
    // var time1 = date.getTime();
    // var time2 = date.valueOf();
    var time3 = Date.parse(date);
    var DATE = util.formatDate(new Date());
    var date2 = new Date(DATE);
    var time2 = Date.parse(date2);
    console.log(time3)
    if (name == '' || name == undefined || name == null) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (phone == '' || phone == undefined || phone == null) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (!phoneRexp.test(phone)) {
      wx.showToast({
        title: '手机号格式有误！',
        icon: 'none',
        duration: 1500,
      })
      return

    }
    if (yzm == '' || yzm == undefined || yzm == null) {
      wx.showToast({
        title: '请填写验证码',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (that.data.hqdyzm != yzm) {
      wx.showToast({
        title: '请输入有效验证码',
        icon: 'none',
        duration: 1500,
      })
    } 
    if (that.data.jieguo == '请选择预约时间') {
      wx.showToast({
        title: '请选择预约时间',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (time3-time2>0){

    }else{
      wx.showToast({
        title: '预约时间得大于当前时间',
        icon: 'none',
        duration: 1500,
      })
      return
    }

    wx.request({
      url: that.data.href + 'api/House/Subscribe',
      method: 'POST',
      data: {
        Hourseid:that.data.id,
        Yuyueren:name,
        Yuyumobile: phone,
        Looktime: time3,  
        // requestCheck:requestCheck
      },    //参数为键值对字符串
   
      success: function (res) {
        console.log(res)
        if (res.data.code == '200') {

          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
          })
        }
      }

    })
  }
})
function count_down(that, total_micro_second) {
  if (total_micro_second <= 0) {
    that.setData({
      VerifyCode: "重新发送",
      inDis: false,
      zcbtn: 1,
    });
    // timeout则跳出递归
    return;
  }
  // 渲染倒计时时钟
  that.setData({
    VerifyCode: date_format(total_micro_second) + " 秒",
    inDis: true
  });
  setTimeout(function () {
    // 放在最后--
    console.log(date_format(total_micro_second))
    total_micro_second -= 1;
    count_down(that, total_micro_second);
  }, 1000)
}
// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second);
  // 小时位
  var hr = Math.floor(second / 360);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 360) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 360 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second)));
  return sec;
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}
