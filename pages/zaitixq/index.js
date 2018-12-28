// pages/wangye/index.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var WxParse = require('../../wxParse/wxParse.js');
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
    // 实例化API核心类
    var demo = new QQMapWX({
      key: 'YVSBZ-D5WW6-JPLS3-EO65N-6ODAK-INFTJ' // 必填
    });
    
      // let con = wx.getStorageSync('zaitixq')

      // var article = con.describe;
      // WxParse.wxParse('article', 'html', article, that, 5);
      // 调用接口
    wx.request({
      url: that.data.href + 'api/House/Detail',
      method: 'get',
      data: {
        id: options.id
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let con = res.data.data.Message
        con.imgUrl
        let a = con.imgUrl.substring(0, con.imgUrl.length - 1)
        con.imgUrl = a.split('&')
        that.setData({
          zaiti: con,
        })
        var article = con.describe;
        WxParse.wxParse('article', 'html', article, that, 5);
        let userid = wx.getStorageSync('userid')
        if (userid) {
          wx.request({
            url: that.data.href + 'api/House/FyBrowseAdd',
            method: 'POST',
            data: {
              houseId: con.id,
              userId: wx.getStorageSync('userid')
            },    //参数为键值对字符串

            success: function (res) {

            }

          })
          // that.getxq(options.id)
        }
        demo.geocoder({
          address: con.address,
          success: function (res) {
            console.log(res);
            that.setData({
              location: res.result.location,
              markers: [{

                latitude: res.result.location.lat,
                longitude: res.result.location.lng,
                name: con.address
              }],
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
        
      }

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
  // 拨打电话
  bdphone:function(){
    var that = this
    console.log(that.data.zaiti.linkMobile)
   wx.makePhoneCall({
     phoneNumber: that.data.zaiti.linkMobile,
   })
  },
  // 导航
  // 去导航
  goditu: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude: that.data.location.lat,
          longitude: that.data.location.lng,
          scale: 17
        })
      }
    })
  },
  // 预约看房
  yylook:function(e){
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '../yuyuekf/index?id='+id,
    })
  },
  // getxq(id) {
  //   var that = this
  //   wx.request({
  //     url: that.data.href + 'api/House/Detail',
  //     method: 'get',
  //     data: {
  //      id:id
  //     },    //参数为键值对字符串

  //     success: function (res) {
  //       console.log(res.data)
  //       let con = res.data.data.Message

  //       var article = con.describe;
  //       WxParse.wxParse('article', 'html', article, that, 5);
        
  //       that.jilian();
  //     }

  //   })
  // }

})