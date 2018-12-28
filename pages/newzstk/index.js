// pages/newzstk/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseid:1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      otherO: options.otherO
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
  choosetype:function(e){

    let id = e.currentTarget.id
   console.log(id)
   this.setData({
     chooseid:id
   })
  },
  submit:function(){
    var that = this
    let typeid = that.data.chooseid
    if (typeid==1){
      wx.navigateTo({
        url: '../zztjfb/index?otherO=' + that.data.otherO,
      })
    }
    if (typeid == 2) {
      wx.navigateTo({
        
        url: '../zstkfb/index?otherO=' + that.data.otherO,
      })
    }
    if (typeid == 3) {
      wx.navigateTo({
        url: '../taxrevenue/index?otherO=' + that.data.otherO,
      })
    }
    if (typeid == 4) {
      wx.navigateTo({
        url: '../other/index?otherO=' + that.data.otherO,
      })
    }
  }
})