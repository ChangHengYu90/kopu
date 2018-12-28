
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    page: 1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let data = {
      page: that.data.page,
      number: 10,
      type: 3,
    }
    that.getlist(data)
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
    let yeshu = parseInt(that.data.page)+1
    that.setData({
      page:yeshu
    })
    that.getlist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getlist(data) {
    var that = this
    wx.request({
      url: that.data.href + 'api/Zhaoshang/ZskList',
      method: 'POST',
      data: {
        page: that.data.page,
        number: 10,
        type: 3
      },    //参数为键值对字符串
      success: function (res) {
        console.log(res.data)
        if (that.data.page<2){
          that.setData({
            sjlist: res.data.data
          })
        }else{
          that.setData({
            sjlist: that.data.sjlist.concat(res.data.data)
          })
        }
        
      }

    })
  },
  fanhui:function(e){
     var that = this
     let index = e.currentTarget.id
     let shuju = that.data.sjlist
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      zhuti: shuju[index] // 假数据
    })
    wx.navigateBack({
      delta: 1
    })
  }
})