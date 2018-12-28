const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  // huo名字
  hqname: function (e) {
    var that = this
    let name = e.detail.value
    that.setData({
      name: name
    })
  },
  // huo名字
  hqdwname: function (e) {
    var that = this
    let name = e.detail.value
    that.setData({
      dwname: name
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
  // huo名字
  hqxqms: function (e) {
    var that = this
    let name = e.detail.value
    that.setData({
      xqms: e.detail.value.replace(/\s+/g, '')
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
      complete: function () {
        wx.hideLoading()
      }

    })
  },
  submit() {
    var that = this
    let phone = that.data.phone
    let name = that.data.name
    let yzm = that.data.yzm
    let dwname = that.data.dwname
    if (dwname == '' || dwname == undefined || dwname == null) {
      wx.showToast({
        title: '请输入单位名称',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    if (name == '' || name == undefined || name == null) {
      wx.showToast({
        title: '请输入联系人',
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
  }
})