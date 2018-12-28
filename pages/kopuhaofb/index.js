var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    uploadpic: [],
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
          city: '未获取获取'
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
  // 获取项目名称
  hqxmname: function (e) {
    var that = this
    that.setData({
      xmname: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqtitle: function (e) {
    var that = this
    that.setData({
      title: e.detail.value.replace(/\s+/g, '')
    })
  },

  
  hqxq: function (e) {
    var that = this
    that.setData({
      xmxq: e.detail.value.replace(/\s+/g, '')
    })
  },


  choosescpic: function () {
    var that = this
    let num = 9
    num = 9 - that.data.uploadpic.length
    wx.chooseImage({
      count: num,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        let scpic = that.data.uploadpic
        for (let i = 0; i < tempFilePaths.length; i++) {
          scpic.push(tempFilePaths[i])
        }
        that.setData({
          uploadpic: scpic
        })
        console.log(tempFilePaths[0])

      }
    })
  },
  godelpic: function (e) {
    var that = this
    let id = e.currentTarget.id
    let piclist = that.data.uploadpic
    piclist.splice(id, 1)
    that.setData({
      uploadpic: piclist
    })
  },
  submit: function () {
    var that = this
    let user = wx.getStorageSync('userxq')
    let xmname = that.data.xmname
    let title = that.data.title
    let xmxq = that.data.xmxq
    let uploadpic = that.data.uploadpic

    let shuju = {
      userId: user.id,
      userName: user.nickName,
      state:1,
      detail: xmxq,
      titile:xmname,
      provinceName:0,
      cityName: 0,
      districtName: 0,
    }

    if (xmname == '' || xmname == undefined || xmname == null) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (title == '' || title == undefined || title == null) {

    } else {
      shuju.abstracts = title
    }
    if (xmxq == '' || xmxq == undefined || xmxq == null) {
      wx.showToast({
        title: '请输入详情',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }

    console.log(uploadpic.length)
    if (uploadpic.length==0){
      wx.showToast({
        title: '请选择图片',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '发布中...',
      mask: true
    })
    if (uploadpic.length > 0) {
      let img = ''
      let isup = 0
      for (let i = 0; i < uploadpic.length; i++) {
        wx.uploadFile({
          url: that.data.href +'api/User/ImgAdd', //仅为示例，非真实的接口地址
          filePath: uploadpic[i],
          name: 'img',
          formData: {
            state: 2
          },
          success(res) {
            console.log(res)
            let scimg = JSON.parse(res.data).data
            let scjg = JSON.parse(res.data).code
            //do something
            if (scjg==100){
              isup=1
            }
            console.log(scimg)
            if (img == '') {
              img = scimg
            } else {
              img = img + scimg
            }

            if (i == uploadpic.length - 1) {
              console.log(23223)
              if (isup==1){
                wx.showToast({
                  title: '图片上传失败，请重试',
                  icon: 'none',
                  duration: 1000,
                  mask: true
                })
               return
              }
              shuju.img = img
              wx.request({
                url: that.data.href + 'api/Quiz/XCXKopuAdd',
                method: 'POST',
                data: shuju,    //参数为键值对字符串
                header: {
                  //设置参数内容类型为x-www-form-urlencoded
                  'content-type': 'application/x-www-form-urlencoded',
                },
                success: function (res) {
                  wx.hideLoading()
                  console.log(res.data)
                  if (res.data.status = 1) {
                    wx.showToast({
                      title: res.data.message,
                      icon: 'success',
                      duration: 1000
                    })
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1,
                      })
                    }, 1000)
                  }
                }, fail: function () {
                  wx.hideLoading()
                }

              })
            }
          },
          complete: function (e) {

          }
        })
      }
    } else {
      wx.request({
        url: that.data.href + 'api/api/Quiz/XCXKopuAdd',
        method: 'POST',
        data: shuju,    //参数为键值对字符串
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.status == 1) {
            wx.navigateBack({
              delta: 1
            })
          }
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500,
          })

        }

      })
    }
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
        if (res.data.code == 200) {
          let shuju = res.data.data
          let array = []
          for (let i = 0; i < shuju.length; i++) {
            array.push(shuju[i].name)
          }
          that.setData({
            array: array,
            yshuju: shuju
          })
        }

      }

    })
  },
})