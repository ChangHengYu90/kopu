
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    zhuti: '',
    uploadpic: [],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let shuju = wx.getStorageSync('xgsj')
    console.log(shuju)
   
    that.setData({
      zyname: shuju.title,
      lxrname: shuju.linkpeople,
      xxdz: shuju.address,
      xmxqms: shuju.content,
      xmid: shuju.id
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
  goxzzt: function () {
    wx.navigateTo({
      url: '../xzztlist/index',
    })
  },
  hqxmname: function (e) {
    this.setData({
      zyname: e.detail.value
    })
  },
  hqlxr: function (e) {
    this.setData({
      lxrname: e.detail.value
    })
  },
  hqphone: function (e) {
    this.setData({
      lxrphone: e.detail.value
    })
  },
  hqdz: function (e) {
    this.setData({
      xxdz: e.detail.value
    })
  },
  hqmj: function (e) {
    this.setData({
      xxmj: e.detail.value
    })
  },
  huxqms: function (e) {
    this.setData({
      xmxqms: e.detail.value
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

    let gsname = that.data.zyname
    let xmlxr = that.data.lxrname
    let xmphone = that.data.lxrphone
    let xmxqms = that.data.xmxqms
    let sheng = that.data.povinceId
    let shi = that.data.cityId
    let qu = that.data.areaId
    let dizhi = that.data.xxdz
    let uploadpic = that.data.uploadpic
    let zishuju = that.data.zhuti
    let shuju = {
      id:that.data.xmid,
      userId: userid,
      status: 2,
      governmentPId: zishuju.id,
      resourceName: gsname,
      linPeople: xmlxr,
      linPhone: xmphone,
      address: dizhi,
      detail: xmxqms,
      provinceId: zishuju.shenid,
      cityId: zishuju.shiid,
      districtId: zishuju.quid,
    }
    if (zishuju == '') {
      wx.showToast({
        title: '请选择项目主体',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }

    if (gsname == '' || gsname == undefined || gsname == null) {
      wx.showToast({
        title: '请输入资源名称',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }

    if (xmlxr == '' || xmlxr == undefined || xmlxr == null) {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (xmphone == '' || xmphone == undefined || xmphone == null) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (dizhi == '' || dizhi == undefined || dizhi == null) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (uploadpic.length < 1) {
      wx.showToast({
        title: '请输入上传图片',
        icon: 'none',
        duration: 1500,
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
              shuju.img = img
              wx.request({
                url: that.data.href + 'api/Administration/XCXGovernmentZiyuanChange',
                method: 'POST',
                data: shuju,    //参数为键值对字符串

                success: function (res) {
                  wx.hideLoading()
                  console.log(res.data)
                  if (res.data.status == 1) {
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
                  }else{
                    wx.showToast({
                      title: res.data.message,
                      icon: 'none',
                      duration: 1500
                    })
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

    }
  },
})