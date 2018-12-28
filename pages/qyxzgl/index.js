
var app = getApp()
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
 
    href: app.data.href,
    page: 1,
    jifen:0,
    zzid:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist()
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
  getlist(){
    var that = this
    wx.request({
      url: that.data.href + 'api/House/UserHouseList',
      method: 'POST',
      data: {
        managerid:wx.getStorageSync('userid'),
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        // for (let i = 0; i < shuju.length; i++) {
        //   console.log(shuju[i].creatTime.substring(6, shuju[i].creatTime.length - 2))
        //   let a = shuju[i].creatTime.substring(6, shuju[i].creatTime.length - 2)
        //   var date = new Date()
        //    date = new Date(parseInt(a))
        //   //年
        //   var year = date.getFullYear();//2015
        //   //月    月份的范围是从0~11,所以获得的月份要加1才是当前月
        //   var mon = date.getMonth();//9
        //   //日
        //   var day = date.getDate();//21
        //    shuju[i].creatTime = year + '-' + mon + '-' + day
           
        // }
        that.setData({
          list: shuju
        })
      }

    })
  },
  gosx:function(e){
    let id = e.currentTarget.id
    var that = this
    wx.request({
      url: that.data.href + 'api/House/UserHouseRefresh',
      method: 'get',
      data: {
        houseId:id,
      
      },    //参数为键值对字符串

      success: function (res) {
       console.log(res)
       if(res.data.code==200){
         that.getlist()
       }
       wx.showToast({
         title: res.data.message,
         icon:"none",
         mask:true,
         duration:1500,
       })
      }

    })
  },
  gozd:function(e){
    let id = e.currentTarget.id
    var that = this
    wx.request({
      url: that.data.href + 'api/House/UserHouseStick',
      method: 'post',
      data: {
        userId:wx.getStorageSync('userid'),
        houseId: id,

      },    //参数为键值对字符串

      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
            
        }
        if (res.data.message =='用户积分不足'){
          that.setData({
            jifen:1
          })
        }
        wx.showToast({
          title: res.data.message,
          icon: "none",
          mask: true,
          duration: 1000,
        })
      }

    })
  },
  godel: function (e) {
    let id = e.currentTarget.id
    var that = this
    wx.request({
      url: that.data.href + 'api/House/UserHouseDel',
      method: 'get',
      data: {
        houseId: id,

      },    //参数为键值对字符串

      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {

        }
        wx.showToast({
          title: res.data.message,
          icon: "none",
          mask: true,
          duration: 1500,
        })
      }

    })
  },
  choosetype:function(e){
    var that =this
   let id = e.currentTarget.id
   that.setData({
     zzid:id
   })
   setTimeout(function(){
     if(id==1){
        wx.navigateTo({
          url: '../wenda/index',
        })
     }
     if (id == 2) {
       wx.navigateTo({
         url: '../zztj/index?typeid=1',
       })
     }
     if (id == 3) {
       wx.navigateTo({
         url: '../zztj/index?typeid=2',
       })
     }
     if (id == 4) {
       wx.showToast({
         title: '该功能暂未开放',
         icon:"none",
         duration:1000,
         mask:true,
       })

     }
     that.setData({
       jifen:0
     })
   },200)
  },
  golljl:function(){
    wx.navigateTo({
      url: '../lljl/index',
    })
  }
})