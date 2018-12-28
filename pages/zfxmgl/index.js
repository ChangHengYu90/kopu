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
    var that = this

    // wx.request({
    //   url: that.data.href + 'api/Administration/GovernmentProjectUser',
    //   method: 'POST',
    //   data: {
    //     userId: wx.getStorageSync('userid'),
    //     page: that.data.page,
    //     number: 10,
    //     typeId: 3,
    //   },    //参数为键值对字符串
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       xmlist: res.data.data
    //     })

    //   }

    // })
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
    wx.request({
      url: that.data.href + 'api/Administration/GovernmentProjectUser',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userid'),
        page: 1,
        number: 10,
        typeId: 3,
      },    //参数为键值对字符串
      success: function (res) {
        console.log(res.data)
        that.setData({
          xmlist: res.data.data,
          page:1,
        })

      }

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
  longTa: function (e) {
    var that = this
    wx.showModal({　　　　//这个不用多说，做过小程序都看得懂
      title: '提示',
      content: '确认删除该记录吗？',
      success: function (res) {
        if (res.confirm) {
          let id = e.currentTarget.id
          wx.showLoading({
            title: '删除中...',
          })
          wx.request({
            url: that.data.href + 'api/Administration/GovernmentProjectDel',
            method: 'get',
            data: {
              governmentPId: id,

            },    //参数为键值对字符串

            success: function (res2) {
              wx.hideLoading()
              console.log(res2.data)
              if (res2.data.code == 200) {
                wx.request({
                  url: that.data.href + 'api/Administration/GovernmentProjectUser',
                  method: 'POST',
                  data: {
                    userId: wx.getStorageSync('userid'),
                    page: that.data.page,
                    number: 10,
                    typeId: 3,
                  },    //参数为键值对字符串
                  success: function (res) {
                    console.log(res.data)
                    that.setData({
                      xmlist: res.data.data
                    })

                  }

                })
              }
              wx.showToast({
                title: res2.data.message,
                icon: 'none',
                mask: true,
                duration: 1500
              })

            }, fail: function () {
              wx.hideLoading()
            }

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goxiugai:function(e){
   var that = this 
   let index = e.currentTarget.dataset.index
    let shuju = that.data.xmlist
    wx.setStorageSync('xgsj', shuju[index])
   wx.navigateTo({
     url: '../zfxiangmxg/index',
   })
  }
})