// pages/wangye/index.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let content = wx.getStorageSync('quyu')
    wx.setNavigationBarTitle({
      title: '推荐详情',
    })
    wx.request({
      url: that.data.href + 'api/Attract/NewsDetail',
      method: 'get',
      data: {
        newsId: options.id
      },    //参数为键值对字符串
      // header: {
      //   //设置参数内容类型为x-www-form-urlencoded
      //   'content-type': 'application/x-www-form-urlencoded',
      // },
      success: function (res) {
        console.log(res.data)
        var article =res.data.data.content;
        var pic = res.data.data.imgurl;
    WxParse.wxParse('article', 'html', article, that, 5);
    that.setData({
      id: options.id,
      pic: pic,
    })
       
      }

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
  // gozszt: function () {
  //   wx.navigateTo({
  //     url: '../zszt/index?type=2&id=' + this.data.id,
  //   })
  // },
  // gozszy: function () {
  //   wx.navigateTo({
  //     url: '../zszt/index?type=1&id=' + this.data.id,
  //   })
  // }
})