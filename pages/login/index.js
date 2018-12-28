// pages/kopu/index.js
var app = getApp()
const util = require('../../utils/util.js');
const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    // typeid: 'password',
    isShowPassword:true,
    typeid:2,
    isshow2:2,
    isshow1: 2,
    phone:"",
    phone2:'',
    pwd:'',
    pwd2:'',
    VerifyCode: '验证码',
    zcbtn: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  toggleShowPassword: function (e) {
    var isShowPassword = !this.data.isShowPassword;
    this.setData({
      isShowPassword: isShowPassword
    });
  },
  goqcphone:function(){
    console.log(11)
    var that = this
    that.setData({
      phone: '',
      isshow1: 2
    })
  },
  goqcphone2: function () {
    console.log(11)
    var that = this
    that.setData({
      phone2: '',
      isshow2: 2
    })
  },
  choosekbk: function(e) {
    var that = this
    let id = e.currentTarget.id
    if (id == 'password') {
      that.setData({
        typeid: 'text'
      })
    } else {
      that.setData({
        typeid: 'password'
      })
    }
  },
  // 忘记密码
  gowjpassword:function(){
    wx.navigateTo({
      url: '../password/index',
    })
  },
  // 注册
  gozc: function () {
    wx.navigateTo({
      url: '../zhuce/index',
    })
  },
  //获取手机号
  hqphone:function(e){
   var that= this
   let phone= e.detail.value
    let pwd = that.data.pwd
    if (phone.length > 0 && pwd.length > 0) {
      that.setData({
        isshow1: 1
      })
    } else {
      that.setData({
        isshow1: 2
      })
    }
   that.setData({
     phone:phone
   })
  },
  //获取密码
  hqpwd: function (e) {
    var that = this
    let pwd = e.detail.value
    let phone = that.data.phone
    if (phone.length > 0 && pwd.length > 0) {
      that.setData({
        isshow1: 1
      })
    } else {
      that.setData({
        isshow1: 2
      })
    }
    
    that.setData({
      pwd: pwd
    })
  },
  //获取手机号
  hqphone2: function (e) {
    var that = this
    let phone = e.detail.value
    let pwd = that.data.pwd2
    if(phone.length>0&&pwd.length>0){
      that.setData({
        isshow2: 1
      })
    }else{
      that.setData({
        isshow2: 2
      })
    }
    that.setData({
      phone2: phone
    })
  },
  //获取密码
  hqpwd2: function (e) {
    var that = this
    let pwd = e.detail.value
    let phone = that.data.phone2
    if (phone.length > 0 && pwd.length > 0) {
      that.setData({
        isshow2: 1
      })
    } else {
      that.setData({
        isshow2: 2
      })
    }
    that.setData({
      pwd2: pwd
    })
  },
  // /提交
  submit:function(){
    var that = this
    let phone = that.data.phone2
    let pwd = that.data.pwd2
    if (phone.length > 0 && pwd.length > 0) {
  
    } else {
      return
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
    if (!myreg.test(phone)) {
       wx.showToast({
          title: '手机号有误！',
           icon: 'none',
            duration: 1500 ,
            mask:true,
            })   
            return 
            } 
    wx.showLoading({
      title: '登录中...',
    })
    wx.request({
      url: that.data.href + 'api/User/LoginAndRegiser',
      method: 'POST',
      data: {
        phone:phone,
        state:4,
        pwd:pwd
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.message == '成功'){
          wx.setStorageSync('userid', res.data.data.user[0].id)
          
          wx.setStorageSync('userxq', res.data.data.user[0])
          setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1500)
          // wx.request({
          //   url: that.data.href +"api/Account/UserInfo?id=" + res.data.data.userId,
          //   success: function (res2) {
          //     console.log(res2)
          //     wx.setStorageSync('userxq', res2.data.data)
          //     wx.showToast({
          //       title: res.data.message,
          //       icon: 'none',
          //       duration: 1500,
          //     })
          //     setTimeout(function () {
          //       wx.navigateBack({
          //         delta: 1,
          //       })
          //     }, 1500)
          //   }
          // })
          
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500,
          })
        }
      },fail:function(){
        wx.hideLoading()
      }

    })
  },
  shoujidl:function(){
    var that = this
    that.setData({
      typeid:2
    })
  },
  gommdl:function () {
    var that = this
    that.setData({
      typeid: 1
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
    wx.showLoading({
      title: '发送中',
      mask: true,
    })
    wx.request({
      url: that.data.href + 'api/User/PostVerify',
      method: 'post',
      data: {
        phone: phone,
        // Account: 'IOSAdmin',
        // Token: '601FD06CA5C9417394334F77F72F7735',
      },    //参数为键值对字符串
      // header: {
      //   //设置参数内容类型为x-www-form-urlencoded
      //   'content-type': 'application/x-www-form-urlencoded',
      // },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.status == '1') {
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;

          wx.setStorageSync('yzm', res.data.data)
          wx.setStorageSync('yzmtime', timestamp)
          that.setData({
            hqdyzm: res.data.data
          })
          var total_micro_second = 59;
          count_down(that, total_micro_second);
          wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function () {
        wx.hideLoading()
      }

    })



  },
  dengl:function(){
    var that = this
    let phone = that.data.phone
    let pwd = that.data.pwd
    let yzm = wx.getStorageSync('yzm')
    let yzmtime = wx.getStorageSync('yzmtime')
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    if (phone.length > 0 && pwd.length > 0) {

    } else {
      return
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return
    }
    if (yzm != pwd){
      wx.showToast({
        title: '请输入有效的验证码！',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return
    }
    if (yzm == pwd && timestamp-yzmtime>600){
      wx.showToast({
        title: '验证码已失效！',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return
    }
    wx.showLoading({
      title: '登录中...',
    })

    wx.request({
      url: that.data.href + 'api/User/LoginAndRegiser',
      method: 'POST',
      data: {
        phone: phone,
        state: 1,
        wxIdentifier:'',
        QQIdentifier:'',
        pwd: 0
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(phone)
        console.log(res.data)
        wx.hideLoading()
        if (res.data.message == '成功') {
          wx.setStorageSync('userid', res.data.data.user[0].id)
          wx.setStorageSync('userxq', res.data.data.user[0])
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)
          // wx.request({
            
          //   url: that.data.href + "api/Account/UserInfo?id=54" + res.data.data.userId,
          //   success: function (res2) {
          //     console.log(res2)
          //     wx.setStorageSync('userxq', res2.data.data)
          //     wx.showToast({
          //       title: res.data.message,
          //       icon: 'none',
          //       duration: 1500,
          //     })
          //     setTimeout(function () {
          //       wx.navigateBack({
          //         delta: 1,
          //       })
          //     }, 1500)
          //   }
          // })

        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500,
          })
        }
      }, fail: function () {
        wx.hideLoading()
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

