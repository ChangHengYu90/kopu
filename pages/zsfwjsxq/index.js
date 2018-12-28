// pages/collectionlist/index.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let id = options.id
    let content= decodeURIComponent(options.content)
    let img = decodeURIComponent(options.img)
    var article = decodeURIComponent(options.content);
    WxParse.wxParse('article', 'html', article, that, 5);
    this.setData({
      id:id,
      content:content,
      img:img,
      name: decodeURIComponent(options.name)
    })
    that.getzslist()
    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.name),
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
  getzslist(){
    var that = this
    wx.request({
      url: that.data.href + 'api/ZSFW/CaseList',
      method: 'POST',
      data: {
        typeId:that.data.id,
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        // for (let i = 0; i < shuju.length; i++) {
        //   shuju[i].HeadImage = shuju[i].HeadImage.substring(3, shuju[i].HeadImage.length)
        //   let a = shuju[i].Img.substring(0, shuju[i].Img.length - 1)
        //   shuju[i].Img = a.split('&')
        // }
        that.setData({
          list: shuju
        })
      }

    })
  },
  gozxsq:function(){
    var that = this
    let user = wx.getStorageSync('userxq')
    if (user == '' || user == undefined || user == null) {
      wx.showToast({
        title: '请先登录',
        mask: true,
        duration: 1500,
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '申请中...',
      mask: true,
    })
    wx.request({
      url: that.data.href + 'api/ZSFW/Online',
      method: 'POST',
      data: {
        phone: user.phone,
        name: user.account,
        typeid: that.data.id,
        type: 1,
      },    //参数为键值对字符串

      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {

        }
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1500
        })

      }, fail: function () {
        wx.hideLoading()
      }

    })
  },
  goguanzhu:function(){
    
  }
})