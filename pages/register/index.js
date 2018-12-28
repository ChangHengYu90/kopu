// pages/register/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    array: ['男', '女'],
    index:0,
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
  // 选择性别
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  choosetx:function(){
    var that = this
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success(res) {
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     let  tempFilePaths = res.tempFilePaths
    //     that.setData({
    //       tempFilePaths:tempFilePaths
    //     })
    //   } 
    // })

  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (photo) {
      that.setData({
        tempFilePaths:photo.tempFilePaths[0]
      })
      wx.getImageInfo({
        src: photo.tempFilePaths[0],
        success: function (res) {
          var ctx = wx.createCanvasContext('photo_canvas');
          var ratio = 2;
          var canvasWidth = res.width
          var canvasHeight = res.height;
          // 保证宽高均在200以内
          while (canvasWidth > 200 || canvasHeight > 200) {
            //比例取整
            canvasWidth = Math.trunc(res.width / ratio)
            canvasHeight = Math.trunc(res.height / ratio)
            ratio++;
          }
          _this.setData({
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight
          })//设置canvas尺寸
          ctx.drawImage(photo.tempFilePaths[0], 0, 0, canvasWidth, canvasHeight)
          ctx.draw()
          //下载canvas图片
          setTimeout(function () {
            wx.canvasToTempFilePath({
              canvasId: 'photo_canvas',
              success: function (res) {
                console.log(res.tempFilePath)
              },
              fail: function (error) {
                console.log(error)
              }
            })
          }, 100)
        },
        fail: function (error) {
          console.log(error)
        }
      })

    },
    error: function (res) {
      console.log(res);
    }
  })
  },
})