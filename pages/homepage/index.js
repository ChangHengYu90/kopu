var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    city: '',
    isshow:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.gethotxm()
    that.gethotxm2()
    that.getbanner()
    
    var that = this
   
    // 实例化API核心类
    var demo = new QQMapWX({
      key: 'YVSBZ-D5WW6-JPLS3-EO65N-6ODAK-INFTJ' // 必填
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 经纬度
        var latitude = res.latitude
        var longitude = res.longitude
        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res.result.address_component.city);
            that.setData({
              city: res.result.address_component.city
            })

          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });


      },
      fail: function () {
        that.setData({
          city: '未获取'
        })
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
    var that = this
    let id = wx.getStorageSync('userid')
    let user= wx.getStorageSync('userxq')
    if(id==''||id==undefined||id==null){

    }else{
      user.headImage = user.headImage.substring(3,user.headImage.length)
       that.setData({
         isshow:2,
         user: user
       })
    }
    if (that.data.city == '' || that.data.city =='未获取'){
      var demo = new QQMapWX({
        key: 'YVSBZ-D5WW6-JPLS3-EO65N-6ODAK-INFTJ' // 必填
      });
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          // 经纬度
          var latitude = res.latitude
          var longitude = res.longitude
          // 调用接口
          demo.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function (res) {
              console.log(res.result.address_component.city);
              that.setData({
                city: res.result.address_component.city
              })

            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
              console.log(res);
            }
          });


        },
        fail: function () {
          that.setData({
            city: '未获取'
          })
        }
      })

    }
    
    wx.request({
      url: that.data.href + 'api/User/ZSSuccessList',
      method: 'POST',
      data: {
        page:1,
        number:10,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          tjcglist: res.data.data
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
  // 招商项目
  gozsxm(){
    wx.navigateTo({
      url: '../syzsxm/index',
    })
  },
  gozfzs(){
    wx.navigateTo({
      url: '../syzfzs/index',
    })
  },
  yqyy:function(){
   wx.showToast({
     title: '暂未开通，敬请期待',
     mask:true,
     icon:'none',
     duration:1500,
   })
  },
  goqyxz(){
    wx.navigateTo({
      url: '../qyxz/index',
    })
  },
  goqyzc() {
    wx.navigateTo({
      url: '../syqyzc/index',
    })
  },
  gozsfw() {
    wx.navigateTo({
      url: '../zsfw/index',
    })
  },
  gozcyz(){
    wx.navigateTo({
      url: '../zcyz/index?city=' + this.data.city,
    })
  },
  // 去登录
  gologin(){
    wx.navigateTo({
      url: '../login/index',
    })
  },
  // 去登录
  gologin2() {
    wx.navigateTo({
      url: '../xiugaixx/index',
    })
  },
  
  // qu服务
  gofuwu:function(){
    wx.navigateTo({
      url: '../projectsblist/index',
    })
  },
  // 项目
  goxiangmu:function(){
    wx.navigateTo({
      url: '../hotpro/index',
    })
  },
  gozaiti:function(){
    wx.navigateTo({
      url: '../zaiti/index',
    })
  },
  goquyu: function () {
    wx.navigateTo({
      url: '../quyu/index',
    })
  },
  // 轮播
  getbanner() {
    var that = this
    wx.request({
      url: that.data.href + 'api/House/Banner',
      method: 'POST',
      data: {},    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          banner: res.data.data
        })
      }

    })

  },
  // 热门项目
  gethotxm(){
    var that =this
    wx.request({
      url: that.data.href + 'api/House/Project',
      method: 'POST',
      data: {},    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length; i++) {
          let img = shuju[i].pimage.split('&')
          shuju[i].pimage = img[0]
        }
        that.setData({
          hotpro: shuju
        })
      }

    })

  },
   // 热门项目
  gethotxm2() {
    var that = this
    wx.request({
      url: that.data.href + 'api/House/GetClass',
      method: 'POST',
      data: {},    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
         
        })
      }

    })

  },
  goproxq(e){
    var that = this
  let id = e.currentTarget.id
  let index = e.currentTarget.dataset.index
  console.log(id)
    let shuju = that.data.hotpro
    wx.setStorageSync('hotpro', shuju[index])
  wx.navigateTo({
    url: '../xiangmxq/index?id='+id,
  })
  },
  gokopu: function () {
    wx.reLaunch({
      url: '../kopuhao/index',
    })
  },
  gozsq: function () {
    let user = wx.getStorageSync('userxq')
    if (user == '' || user == undefined || user == null) {
      wx.showToast({
        title: '请先登录',
        mask: true,
        duration: 1500,
        icon: 'none'
      })
      setTimeout(function(){
        wx.navigateTo({
          url: '../login/index',
        })
      },1500)
    }else{
      wx.reLaunch({
        url: '../zsqgz/index',
      })
    }
    
  },
  
  gomy: function () {
    let id = wx.getStorageSync('userid')
    if(id==''||id==undefined||id==null){
       wx.showToast({
         title: '请先登录',
         icon:'none',
         mask:true,
         duration:1500
       })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1500)
    }else{
      wx.reLaunch({
        url: '../my/index',
      })
    }
    
  },
  golookxqlb: function (e) {
    let title = e.currentTarget.dataset.name
    let content = e.currentTarget.dataset.content
    let img = e.currentTarget.dataset.img
    wx.navigateTo({
      url: '../bannerxq/index?title=' + encodeURIComponent(title) + "&image=" + encodeURIComponent(img) + "&content=" + encodeURIComponent(content),
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

  tabshow: function () {
    var that = this
    let user = wx.getStorageSync('userxq')
    if (user == '' || user == undefined || user == null) {
      wx.showToast({
        title: '请先登录',
        mask: true,
        duration: 1500,
        icon: 'none'
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
  golookmore:function(){
    wx.navigateTo({
      url: '../syzsxm/index',
    })
  },
  choosecity:function(){
    var that = this
    wx.navigateTo({
      url: '../choosecs/index?city='+that.data.city,
    })
  },
  gohzfb:function(){
    var that = this
    wx.navigateTo({
      url: '../hzjgfb/index'
    })
  },
  gozijinsq:function(){
    var that = this
    wx.navigateTo({
      url: '../zjsq/index'
    })
  }
})