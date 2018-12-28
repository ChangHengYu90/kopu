var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getzstk()
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
    var that = this
    let yeshu = parseInt(that.data.page) + 1
    that.setData({
      page: yeshu
    })
    that.getzstk()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getzstk() {
    var that = this
    wx.request({
      url: that.data.href + 'api/User/OnlineList',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userid'),
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串

      success: function (res) {
       console.log(res)
        if (that.data.page < 2) {
          that.setData({
            list: res.data.data
          })
        } else {
          that.setData({
            list: that.data.list.concat(res.data.data)
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }

    })
  },
})