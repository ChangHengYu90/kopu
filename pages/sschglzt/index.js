
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    leixing:'',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      content: wx.getStorageSync('xgsj')
    })
    console.log(wx.getStorageSync('xgsj'))
    that.getxmtype()

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
  getxmtype() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Project/ProjectType',
      method: 'POST',
      data: {

      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let id = that.data.content.typeId
        if (res.data.code == 200) {
          let shuju = res.data.data
          let array = []
          for (let i = 0; i < shuju.length; i++) {
           if(shuju[i].id==id){
             that.setData({
               leixing: shuju[i].name
             })

           }
          }
          
        }

      }

    })
  },
})