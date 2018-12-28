// pages/zfzaitixq/index.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    zxsqid:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let xq = wx.getStorageSync('zfzaitixq')
    var article = xq.content;
    console.log(xq)
    WxParse.wxParse('article', 'html', article, that, 5);
    this.setData({
      xq:xq,
      typeid: options.type
    })
    if (options.type==1){
      that.setData({
        zxsqid:1
      })
    }

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
  gozxsq:function(){
    // wx.navigateTo({
    //   url: '../zfzslizxsq/index',
    // })
    var that = this
    let user = wx.getStorageSync('userxq')
    if (user == '' || user == undefined || user==null){
        wx.showToast({
          title: '请先登录',
          mask:true,
          duration:1500,
          icon:'none'
        })
        return
    }
    wx.showLoading({
      title: '申请中...',
      mask:true,
    })
    wx.request({
      url: that.data.href + 'api/Zhaoshang/FinancialZF',
      method: 'POST',
      data: {
        linkphone: user.phone,
        linkren: user.account,
        wenzhangid:that.data.xq.id,
        type:1,
      },    //参数为键值对字符串

      success: function (res) {
       wx.hideLoading()
        console.log(res.data)
        if (res.data.code==200){
           
        }
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 1500
        })
        
      },fail:function(){
        wx.hideLoading()
      }

    })
  }
})