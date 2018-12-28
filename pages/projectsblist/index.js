// pages/collectionlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabid: 1,
    href: app.data.href,
    page: 1,
    number: 1,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethotxm()
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
  choosetab: function (e) {
    var that = this
    let id = e.currentTarget.id
    if (that.data.tabid == id) {
      return
    } else {
      that.setData({
        tabid: id,
        page:1,
      })
      that.gethotxm()
    }
  },
  // 热门项目
  gethotxm() {
    var that = this
    wx.request({
      url: that.data.href + 'api/ZSFW/XmsbList',
      method: 'POST',
      data: {
        page:that.data.page,
        number: that.data.number,
        typeId: that.data.tabid,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          xmlist: res.data.data
        })
      }

    })

  },
  golookxq: function (e) {
    console.log(e)
    let id = e.currentTarget.id
    let img = e.currentTarget.dataset.img
    let content = e.currentTarget.dataset.content
    let name = e.currentTarget.dataset.name

    wx.navigateTo({
      url: '../zsfwjsxq/index?id=' + id + "&content=" + encodeURIComponent(content) + "&img=" + encodeURIComponent(img) + "&name=" + encodeURIComponent(name),
    })
  }
})