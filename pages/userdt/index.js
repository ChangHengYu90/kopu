// pages/kopu/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    typeid:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userid: options.id
    })
    this.getsjlist()
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
  getsjlist() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Dynaminc/UserDynamincList',
      method: 'POST',
      data: {
        userId:that.data.userid,
        number: 10,
        page: 1,
        state: that.data.typeid,
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length; i++) {
          shuju[i].HeadImage = shuju[i].HeadImage.substring(3, shuju[i].HeadImage.length)
          if (shuju[i].Img != '') {
            shuju[i].Img = shuju[i].Img.substring(0, shuju[i].Img.length - 1)
            shuju[i].Img = shuju[i].Img.split('&')
          }
        }
        that.setData({
          sjlist: shuju
        })
      }

    })
  },
  // 点赞
  dianzan: function () {
    var that = this
    wx.request({
      url: that.data.href + 'api/Dynaminc/PraiseAdd',
      method: 'POST',
      data: {
        number: 10,
        page: 1,
        state: 1,
      },    //参数为键值对字符串

      success: function (res) {
        console.log(that.data.href + 'api/Dynaminc/PraiseAdd')
        console.log(res.data)
      }

    })
  },
  // 切换
  choosetypeid:function(e){
   var that = this
   let id = e.currentTarget.id
    let typeid = that.data.typeid
   if(id == typeid){
      return
   }
   that.setData({
     typeid:id
   })
    this.getsjlist()
  }
})