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
    let sheng = options.sheng
    let shi = options.shi
    let qu = options.qu
    let name = options.name
    wx.setNavigationBarTitle({
      title: name,
    })
    this.setData({
      sheng: sheng,
      shi: shi,
      qu: qu,
    })
    this.getshuji()
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
  getshuji(){
   var that = this
    wx.request({
      url: that.data.href + 'api/ZCXZ/zcyzList', 
      method: 'POST',
      data: {
        page: that.data.page,
        number: 10,
        shengId:that.data.sheng,
        sheId: that.data.shi,
        quId: that.data.qu
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
  }
})