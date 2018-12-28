// pages/kopuwd/index.js
var app = getApp()
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
    that.gethdlist()
   that.setData({
     title:options.title,
     id: options.id,
     hdnum: options.hdnum,
     jf: options.jf,
     wyhd:1
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
  gethdlist() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Quiz/ReplyList',
      method: 'POST',
      data: {
        quizId:that.data.id,
        page:that.data.page,
        number:100,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data  
        for (let i = 0; i < shuju.length;i++){
          shuju[i].HeadImage = shuju[i].HeadImage.substring(3, shuju[i].HeadImage.length)
        }
        that.setData({
          pl: shuju  
        })
      }

    })

  },
  woyaohd:function(){
   var that = this
   that.setData({
     wyhd:2
   })
  },
  gbpl:function(){
    var that = this
    that.setData({
      wyhd: 1
    })
  },
  hqpkcon:function(e){
   let con = e.detail.value
   this.setData({
     pjcontent: con
   })
  },
  fbpjcon:function(){
    var that = this
      let pjcon = that.data.pjcontent
    if (pjcon == '' || pjcon == null || pjcon==undefined){
       wx.showToast({
         title: '请输入评价内容',
         icon:'none',
         duration:1500,
       })
       return
    }
    that.setData({
      wyhd: 1
    })
    wx.request({
      url: that.data.href + 'api/Quiz/QuizReplyAdd',
      method: 'POST',
      data: {
        dynamicId: that.data.id,
        userId: wx.getStorageSync('userid'), 
        // username:
        page: that.data.page,
        detail: pjcon,
      },    //参数为键值对字符串
      // header: {
      //   //设置参数内容类型为x-www-form-urlencoded
      //   'content-type': 'application/x-www-form-urlencoded',
      // },
      success: function (res) {
        console.log(res.data)
        if (res.data.code==200){
          that.gethdlist()
           wx.showToast({
             title: res.data.message,
             icon:'none',
             duration:1500,
             mask:true
           })
        }
        that.setData({
          pl: res.data.data
        })
      }

    })
  }
})