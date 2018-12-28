// pages/wangye/index.js
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    
    // let content = wx.getStorageSync('quyu')
    // wx.setNavigationBarTitle({
    //   title: content.title,
    // })

    var article = decodeURIComponent(options.content);
    WxParse.wxParse('article', 'html', article, that, 5);
    that.setData({
      id: options.id,
      title: decodeURIComponent(options.title)
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
  gozxsq: function () {
    var that = this
    let user = wx.getStorageSync('userxq')
    if(user){
      wx.request({
        url: that.data.href + 'api/Government/PolicyApplyLine',
        method: 'post',
        data: {
          linkren: user.account,
          linkmoblie: user.phone,

        },    //参数为键值对字符串
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/json'
          // 'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res2) {
          console.log(res2.data)
          wx.showToast({
            title: res2.data.message,
            icon: 'none',
            duration: 1500,
          })
          
        }

      })
    }else{
      wx.showToast({
        title: '请先登录！',
        icon: 'none',
        duration: 1500,
      })
    }
    // wx.navigateTo({
    //   url: '../zxsqzc/index?id=' + this.data.id,
    // })
    
  },
  
})