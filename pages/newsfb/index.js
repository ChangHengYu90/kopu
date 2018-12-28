
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    array: ['新科技', '新能源', '新兴信息产业', '节能环保', '生物产业', '清洁能源汽车', '高端装备制造业'],
    index:0,
    leixing: '请选择',
    uploadpic: [],
    biaoti:'',
    isxg:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let shuju = wx.getStorageSync('xgsj')
    console.log(shuju)
    if (shuju){
      if (shuju.zixuntype == '' || shuju.zixuntype == null || shuju.zixuntype == undefined){
        that.setData({
          biaoti: shuju.title,
          xmxqzw: shuju.content,
        })
         }else{
        let a = shuju.zixuntype-1
        that.setData({
          biaoti: shuju.title,
          xmxqzw: shuju.content,
          leixing: that.data.array[a],
          xmid: shuju.id,
          isxg:1

        })
         }
        
    }else{
      console.log(99)
    }
  
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

  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      leixing: that.data.array[e.detail.value],
      leixingid: parseInt(e.detail.value)+1
    })
  },
  // 获取项目名称
  hqxmname: function (e) {
    var that = this
    that.setData({
      biaoti: e.detail.value.replace(/\s+/g, '')
    })
  },
  huxqms: function (e) {
    var that = this
    that.setData({
      xmxqms: e.detail.value.replace(/\s+/g, '')
    })
  },
  huxqzw: function (e) {
    var that = this
    that.setData({
      xmxqzw: e.detail.value.replace(/\s+/g, '')
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
    let userid = wx.getStorageSync('userid')
    let biaoti = that.data.biaoti
    let leixing = that.data.leixing
    let uploadpic = that.data.uploadpic
   
    let shuju = {
      puid: userid,
      title: biaoti,
      typeId:1,
    }
    if (biaoti == '' || biaoti == undefined || biaoti == null) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (leixing == '请选择') {
    } else {
      shuju.zixuntype = that.data.leixingid
    }
    if(that.data.isxg==1){
      shuju.id = that.data.xmid
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
          url: that.data.href + 'api/User/ImgAdd', //仅为示例，非真实的接口地址
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
            if (scjg == 100) {
              isup = 1
            }
            console.log(scimg)
            if (img == '') {
              img = scimg
            } else {
              img = img + scimg
            }

            if (i == uploadpic.length - 1) {
              console.log(23223)
              if (isup == 1) {
                wx.showToast({
                  title: '图片上传失败，请重试',
                  icon: 'none',
                  duration: 1000,
                  mask: true
                })
                return
              }
              shuju.imgurl = img
              wx.request({
                url: that.data.href + 'api/User/XCXNewAdd',
                method: 'POST',
                data: shuju,    //参数为键值对字符串

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
        url: that.data.href + 'api/User/XCXNewAdd',
        method: 'POST',
        data: shuju,    //参数为键值对字符串

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