var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    tanisshow:1,
    isshow:1,
    isshow2:1,
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
    var that = this
    let id = wx.getStorageSync('userid')
    wx.request({
      url: that.data.href +"api/Account/UserInfo?id=" + id,
      success: function (res2) {
        console.log(res2)
        wx.setStorageSync('userxq', res2.data.data)
        let user = res2.data.data
        user.headImage = user.headImage.substring(3, user.headImage.length)
        that.setData({
          userxx: user,
        })
      }
    })
    wx.removeStorage({
      key: 'xgsj',
      success: function(res) {

      },
    })
    wx.removeStorage({
      key: 'hotpro',
      success: function (res) {

      },
    })
   
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
  gosy:function(){
    wx.reLaunch({
      url: '../homepage/index',
    })
  },
  gozsq: function () {
    wx.reLaunch({
      url: '../zsqgz/index',
    })
  },
  gokopu: function () {
    wx.reLaunch({
      url: '../kopuhao/index',
    })
  },
  gofabu:function(e){
    var that = this
   let dizhi = e.currentTarget.dataset.dizhi
   console.log(222)
   wx.navigateTo({
     url: dizhi,
   })
    that.setData({
      tanisshow: 1
    })
  },
  tabshow:function(){
    var that = this
    that.setData({
      tanisshow:2
    })
  },
  closetab:function(){
    var that = this
    that.setData({
      tanisshow: 1
    })
  },
  gosetting: function () {
    wx.navigateTo({
      url: '../setting/index',
    })
  },
  // gotuikejl: function () {
  //   wx.navigateTo({
  //     url: '../zztj/index',
  //   })
  // },
  gotuikejl: function () {
    var that = this
    let id = that.data.isshow2
    console.log(id)
    if (id == 1) {
      that.setData({
        isshow2: 2
      })
    } else {
      that.setData({
        isshow2: 1
      })
    }
  },
  golljl: function () {
    wx.navigateTo({
      url: '../collectionlist/index',
    })
  },
  godtjl:function(){
    var that = this
    wx.navigateTo({
      url: '../dongtaijl/index?id='+wx.getStorageSync('userid'),
    })
  },
  gofygl: function () {
    wx.navigateTo({
      url: '../qyxzgl/index',
    })
  },
  gofyfb:function(){
    wx.navigateTo({
      url: '../qyxzfb/index',
    })
    var that = this
    that.setData({
      tanisshow: 1
    })
  },
  gozfxm:function(){
    var that = this
    let id = that.data.isshow
    console.log(id)
    if(id==1){
      that.setData({
        isshow:2
      })
    }else{
      that.setData({
        isshow: 1
      })
    }
  },
  goxmgl:function(e){
    var that = this
   let url = e.currentTarget.dataset.url
   wx.navigateTo({
     url: url,
   })
   that.setData({
     isshow: 1
   })
  },
  goxmgl2: function (e) {
    var that = this
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
    that.setData({
      isshow2: 1
    })
  },
  gozygl: function (e) {
    var that = this
    let id = e.currentTarget.id
    wx.navigateTo({
      url: "../zfxmzygl/index?id="+id,
    })
    that.setData({
      isshow: 1
    })
  },
  goztfb:function(){
    var that = this
    wx.navigateTo({
      url: "../zsxmztfb/index",
    })
    that.setData({
      isshow: 1
    })
  },
  gozyfb: function () {
    var that = this
    wx.navigateTo({
      url: "../zsxmzyfb/index",
    })
    that.setData({
      isshow: 1
    })
  },
  gohzjg:function(){
    wx.navigateTo({
      url: '../xmsb/index',
    })
  },
  gozszy:function(){
    wx.navigateTo({
      url: '../zszy/index',
    })
  },
  huiysj:function(){
    wx.showToast({
      title: '暂未开通，敬请期待',
      mask: true,
      icon: 'none',
      duration: 1500,
    })
  }
})