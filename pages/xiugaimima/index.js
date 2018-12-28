// var app = getApp()
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     href: app.data.href,
//     imgurl: app.data.imgurl,

//   },


//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   },
//   hqoldpwd:function(e){
//   let oldpwd = e.detail.value
//     console.log(oldpwd)
//     this.setData({
//       oldpwd: oldpwd
//     })
//   },
 
//   hqnewpwd: function (e) {
//     let newpwd = e.detail.value
//     console.log(newpwd)
//     this.setData({
//       newpwd: newpwd
//     })
//   },
//   hqqrpwd: function (e) {
//     let oldpwd = e.detail.value
//     console.log(oldpwd)
//     this.setData({
//       qrpwd: oldpwd
//     })
//   },
//   gotijiao:function(){
//    var that = this
//     let oldpwd = that.data.oldpwd
//     let newpwd = that.data.newpwd
//     let qrpwd = that.data.qrpwd
//     if (oldpwd == '' || oldpwd == undefined || oldpwd==null){
//      wx.showToast({
//        title: '请填写原密码',
//        icon:'none',
//        duration:1500,
//        mask:true
//      })
//      return
//    }
//     if (newpwd == '' || newpwd == undefined || newpwd == null) {
//       wx.showToast({
//         title: '请填写新密码',
//         icon: 'none',
//         duration: 1500,
//         mask: true
//       })
//       return
//     }
//     if (qrpwd == '' || qrpwd == undefined || qrpwd == null) {
//       wx.showToast({
//         title: '请填写确认密码',
//         icon: 'none',
//         duration: 1500,
//         mask: true
//       })
//       return
//     }
//     if (qrpwd != newpwd) {
//       wx.showToast({
//         title: '确认密码不一致',
//         icon: 'none',
//         duration: 1500,
//         mask: true
//       })
//       return
//     }
//     wx.request({
//       url: that.data.href + 'api/',
//       method: 'POST',
//       data: {
        
//       },    //参数为键值对字符串
//       header: {
//         //设置参数内容类型为x-www-form-urlencoded
//         'content-type': 'application/x-www-form-urlencoded',
//       },
//       success: function (res) {
//         console.log(res.data)
//         if (res.data.code = 200) {
        
//         }
//       }

//     })
//   }
// })
// pages/kopu/index.js
var app = getApp()
const util = require('../../utils/util.js');
const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    VerifyCode: '验证码',
    zcbtn: 1,
    hqdyzm: ''

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      let userxq = wx.getStorageSync('userxq')
      
    console.log(Number(userxq.phone) )
    that.setData({
      phone: Number(userxq.phone) 
    })
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
  // 获取手机号
  hqphone: function (e) {
    var that = this
    let phone = e.detail.value
    that.setData({
      phone: phone
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
    let pwd = e.detail.value
    that.setData({
      pwd: pwd
    })
  },
  // 获取确认密码
  hqqrpwd: function (e) {
    var that = this
    let qrpwd = e.detail.value
    that.setData({
      qrpwd: qrpwd
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
        wx.hideLoading()
        if (res.data.status == '1') {
          wx.setStorageSync('yzm1', res.data.data)
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          wx.setStorageSync('yzmtime1', timestamp)
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
      fail: function () {
        wx.hideLoading()
      }

    })



  },
  submit: function () {
    var that = this
    let phone = that.data.phone

    let yzm = that.data.yzm
    let pwd = that.data.pwd
    let qrpwd = that.data.qrpwd
    let hqdyzm = wx.getStorageSync("yzm1")
    let yzmtime = wx.getStorageSync("yzmtime1")
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // if (name == '' || name == undefined || name == null) {
    //   wx.showToast({
    //     title: '请输入昵称',
    //     icon: 'none',
    //     duration: 1500,
    //   })
    //   return
    // }
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
    if (hqdyzm != yzm) {
      wx.showToast({
        title: '请输入有效验证码',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (timestamp - yzmtime > 600) {
      wx.showToast({
        title: '验证码已失效',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (pwd == '' || pwd == undefined || pwd == null) {
      wx.showToast({
        title: '请填写密码',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (qrpwd == '' || qrpwd == undefined || qrpwd == null) {
      wx.showToast({
        title: '请填写确认密码',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (qrpwd != pwd) {
      wx.showToast({
        title: '密码与确认密码不一致',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    wx.showLoading({
      title: '修改中',
      mask: true,
    })
    let requestCheck = phone + yzm + '1c6e1d370e89a87';
    // requestCheck = md5(requestCheck).toLocaleLowerCase();
    wx.request({
      url: that.data.href + 'api/Account/ForgetPassword',
      method: 'POST',
      data: {
        phone: phone,
        pwd: pwd,
        // requestCheck:requestCheck
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.code == '200') {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 2
            })
          },1000)
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: function () {
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