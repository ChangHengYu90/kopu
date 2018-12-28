// pages/kopu/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    ftwtw: 2,
    tanisshow:1,
    page:1
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
    this.getsjlist()
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
    that.getsjlist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getsjlist() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Dynaminc/DynamincList',
      method: 'POST',
      data: {
        number: 10,
        page: that.data.page,
        state: 1,
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
        if(that.data.page>1){
          that.setData({
            sjlist: that.data.sjlist.concat(shuju)
          })
        }else{
          that.setData({
            sjlist: shuju
          })
        }
        
      }

    })
  },
  // 点赞
  dianzan: function (e) {
    var that = this
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    let shuju = that.data.sjlist
    console.log(index)
    console.log(id)
    wx.request({
      url: that.data.href + 'api/Dynaminc/PraiseAdd',
      method: 'get',
      data: {
        dynamincId: id,

      },    //参数为键值对字符串

      success: function (res2) {
        console.log(res2.data.code)
        if (res2.data.code == 200) {
          wx.showToast({
            title: res2.data.message,
            icon: 'none',
            duration: 1500,
            mask: true,
          })
          shuju[index].like = parseInt(shuju[index].like) + parseInt(1)
          that.setData({
            sjlist: shuju
          })
        }

      }

    })
  },
  gouserdt: function (e) {
    let id = e.currentTarget.id
    // wx.navigateTo({
    //   url: '../userdt/index?id=' + id,
    // })
    wx.navigateTo({
      url: '../dongtaijl/index?id=' + id,
    })
  },
  godongtaixq: function (e) {
    var that = this
    let index = e.currentTarget.id
    let shuju = that.data.sjlist
    wx.setStorageSync('dtxq', shuju[index])
    let id = e.currentTarget.dataset.xmid
    wx.navigateTo({
      url: '../dongtaixq/index?id='+id,
    })

  },
  isshowftwtw: function () {
    var that = this
    let typeid = that.data.ftwtw
    if (typeid == 1) {
      that.setData({
        ftwtw: 2
      })
    } else {
      that.setData({
        ftwtw: 1
      })
    }
  },
  // gofabu: function (e) {
  //   var that = this
  //   let id = e.currentTarget.id
  //   that.setData({
  //     ftwtw: 2
  //   })
  //   wx.navigateTo({
  //     url: '../dongtaijlfb/index?id=' + id,
  //   })
  // },

  gozsq: function () {
    let id = wx.getStorageSync('userid')
    if (id == '' || id == undefined || id == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        mask: true,
        duration: 1500
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1500)
     
    }else{
      wx.reLaunch({
        url: '../zsqgz/index',
      })
    }
  },
  gosy: function () {
    wx.reLaunch({
      url: '../homepage/index',
    })
  },
  gomy: function () {
    let id = wx.getStorageSync('userid')
    if (id == '' || id == undefined || id == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        mask: true,
        duration: 1500
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1500)
    } else {
      wx.reLaunch({
        url: '../my/index',
      })
    }
  },
  tabshow: function () {
    var that = this
    let id = wx.getStorageSync('userid')
    if (id == '' || id == undefined || id == null) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        mask: true,
        duration: 1500
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1500)
    }else{
      that.setData({
        tanisshow: 2
      })
    }
  },
  closetab: function () {
    var that = this
    that.setData({
      tanisshow: 1
    })
  },
  gofabu: function (e) {
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
  looktp:function(e){
    let imglist = e.currentTarget.dataset.imglist
    let img = e.currentTarget.dataset.img
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: imglist // 需要预览的图片http链接列表
    })
  }
})
