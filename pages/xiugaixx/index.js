// pages/register/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    array: ['男', '女'],
    index:0,
    nickname:'',
    company:'',
    address:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this
     wx.getStorage({
       key: 'userxq',
       success: function(res) {
         console.log(res.data)
         let user = res.data
         let nn = 0
         if (user.gender=='女'){
           nn=1
         }
         user.headImage = user.headImage.substring(3, user.headImage.length)
         that.setData({
           userxx:res.data,
           index:nn,
           nickname: res.data.nickName,
           company: res.data.nickName,
           address: res.data.nickName,
           otherO: res.data.otherO
         })
       },
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
          that.setData({
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
                wx.showLoading({
                  title: '修改中...',
                })
                wx.uploadFile({
                  url: that.data.href +'api/User/Upfile', //仅为示例，非真实的接口地址
                  filePath: res.tempFilePath,
                  name: 'headImage',
                  formData: {
                    Account:'IOSAdmin',
                    Token:'601FD06CA5C9417394334F77F72F7735',
                    userid: wx.getStorageSync('userid'),
                  },
                  success(res2) {
                    console.log(res2)
                    const data = res2.data
                    let scimg = JSON.parse(res2.data).data
                    let scjg = JSON.parse(res2.data).status
                    if (scjg==1){
                      wx.showToast({
                        title: '修改成功',
                        icon: 'none',
                        duration: 1000
                      })
                      wx.request({
                        url: that.data.href + "api/Account/UserInfo?id=" + wx.getStorageSync('userid'),
                        success: function (res2) {
                          console.log(res2)
                          wx.setStorageSync('userxq', res2.data.data)
                          let user = res2.data.data
                          user.headImage = user.headImage.substring(3, user.headImage.length)
                          that.setData({
                            userxx: user,
                          })
                        }
                      })
                    }else{
                      wx.showToast({
                        title: '修改失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                

                  }
                })
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
  // 获取昵称
  hqnc:function(e){
    let name = e.detail.value.replace(/\s+/g, '')
   console.log(name)
   this.setData({
     nickname: e.detail.value.replace(/\s+/g, '')
   })
  },
  hqgsdz: function (e) {
    let name = e.detail.value.replace(/\s+/g, '')
    this.setData({
      address: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqgsmz: function (e) {
    let name = e.detail.value.replace(/\s+/g, '')
    this.setData({
      company: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqgsjj: function (e) {
    let name = e.detail.value.replace(/\s+/g, '')
    this.setData({
      otherO: e.detail.value.replace(/\s+/g, '')
    })
  },
  gowc:function(){
    var that = this
    let nickname = that.data.nickname
    let company = that.data.company
    let address = that.data.address
    let otherO = that.data.otherO
    let data = { id: wx.getStorageSync('userid'),
      gender:that.data.array[that.data.index],
    }
    console.log(nickname)
    if (nickname == '' || nickname == undefined || nickname.length==0){
    console.log(111)
         wx.showToast({
           title: '请填写昵称',
           icon:'none',
           duration:1500,
           mask:true
         })
         return
       }else{
        data.nickname = nickname
       }
    
    if (company != ''){
      data.company = company
    }
    if (address != '') {
      data.address = address
    }
    if (otherO != '') {
      data.address = otherO
    }
    
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: that.data.href + 'api/User/UserInfoMessage',
      method: 'POST',
      data: data,    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code = 200) {
          wx.showToast({
            title: '修改成功',
            icon:'success',
            duration:1000
          })
          setTimeout(function(){
            wx.navigateBack({
              delta:2,
            })
          },1000)
        }
      }

    })
  }
})