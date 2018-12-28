
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    array: [['厂房', '园区', '土地', '办公'], ['出租', '出售', '求租', '求售']],
    array2: ['硕士以下', '硕士以上', '博士以上'],
    array3: ['一千万以下', '三千万以下', '三千万以上'],
    array4: ['50万以下', '50万以上', '200万以上'],
    array5: ['3个以下', '3个以上', '10个以上'],
    multiIndex: [0, 0],
    leixing: '请选择',
    sheng: [],//获取到的所有的省
    shi: [],//选择的该省的所有市
    qu: [],//选择的该市的所有区县
    sheng_index: 0,//picker-view省项选择的value值
    shi_index: 0,//picker-view市项选择的value值
    qu_index: 0,//picker-view区县项选择的value值
    shengshi: null,//取到该数据的所有省市区数据
    jieguo: {},//最后取到的省市区名字
    animationData: {},
    jieguo2: [0, 0, 0],
    dizhi: '请选择',
    uploadpic: [],
    zhuanli: '3个以下',
    shuishou: '50万以下',
    chanzhi: '一千万以下',
    rencai: "硕士以下",
    zhuanliid: 0,
    shuishouid: 0,
    chanzhiid: 0,
    rencaiid: 0,
    yinc:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: that.data.href + 'api/House/DistrictList',
      method: 'POST',
      data: {

      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          shengshi: res.data.data.Province,
        })
        that.jilian();
      }

    })
    that.getxmtype()
    let yuanshuju = wx.getStorageSync('xgsj')
    console.log(yuanshuju)
    that.setData({
      xmname:yuanshuju.ptitle,
      gsname: yuanshuju.gongsi,
      dizhi: yuanshuju.provinceCity,
      povinceId: yuanshuju.sid,
      cityId: yuanshuju.cid,
      areaId: yuanshuju.quid,
      xmlxr: yuanshuju.plinkpeople,
      xmphone: yuanshuju.plinkphone,
      xmxqms: yuanshuju.pcontent,
      xmid: yuanshuju.pid,
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
  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      leixing: that.data.array[e.detail.value],
      leixingid: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      rencai: that.data.array2[e.detail.value]
    })
  },
  bindPickerChange3: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      chanzhi: that.data.array3[e.detail.value]
    })
  },
  bindPickerChange4: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      shuishou: that.data.array4[e.detail.value]
    })
  },
  bindPickerChange5: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      zhuanli: that.data.array5[e.detail.value]
    })
  },
  choooserc(e) {
    var that = this
    let id = e.currentTarget.id
    let con = e.currentTarget.dataset.con
    that.setData({
      rencai: con,
      rencaiid: id
    })
  },
  chooosecz(e) {
    var that = this
    let id = e.currentTarget.id
    let con = e.currentTarget.dataset.con
    that.setData({
      chanzhi: con,
      chanzhiid: id
    })
  },
  chooosess(e) {
    var that = this
    let id = e.currentTarget.id
    let con = e.currentTarget.dataset.con
    that.setData({
      shuishou: con,
      shuishouid: id
    })
  },
  chooosezl(e) {
    var that = this
    let id = e.currentTarget.id
    let con = e.currentTarget.dataset.con
    that.setData({
      zhuanli: con,
      zhuanliid: id
    })
  },
  //点击事件，点击弹出选择页
  dianji: function () {
    console.log(222)
    var that = this
    //这里写了一个动画，让其高度变为满屏
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation

    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        animation.height(res.windowHeight + 'px').step()
        that.setData({
          animationData: animation.export(),
          yinc: 0,
        })
      }
    })
  },
  //取消按钮
  quxiao: function () {
    //这里也是动画，然其高度变为0
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.height(0 + 'rpx').step()
    this.setData({
      animationData: animation.export()
    });
    //取消不传值，这里就把jieguo 的值赋值为{}
    this.setData({
      jieguo: {},
      yinc: 1,
    });
    console.log(this.data.jieguo);
  },
  //确认按钮
  queren: function () {
    //一样是动画，级联选择页消失，效果和取消一样
    var that = this
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(0 + 'rpx').step()
    console.log(that.data.jieguo2)
    // var povinceId = that.data.shengshi[that.data.jieguo2[0]].areaId
    // var cityId = that.data.shengshi[that.data.jieguo2[0]].cities[that.data.jieguo2[1]].areaId
    // var areaId = that.data.shengshi[that.data.jieguo2[0]].cities[that.data.jieguo2[1]].counties[that.data.jieguo2[2]].areaId
    var povinceId = that.data.shengshi[that.data.jieguo2[0]].ID
    var cityId = ''
    var areaId = ''
    var dizhi = this.data.jieguo.sheng
    if (that.data.jieguo.shi != undefined) {
      dizhi = dizhi + '-' + this.data.jieguo.shi
      cityId = that.data.shengshi[that.data.jieguo2[0]].CityLise[that.data.jieguo2[1]].ID

    }
    if (that.data.jieguo.qu != undefined) {
      dizhi = dizhi + '-' + this.data.jieguo.qu
      areaId = that.data.shengshi[that.data.jieguo2[0]].CityLise[that.data.jieguo2[1]].DistrictLise[that.data.jieguo2[2]].ID
    }
    this.setData({
      dizhi: dizhi,
      animationData: animation.export(),
      povinceId: povinceId,
      cityId: cityId,
      areaId: areaId,
      yinc: 1,
    });

    //打印最后选取的结果
    console.log(this.data.jieguo.sheng);
    console.log(povinceId);
    console.log(cityId);

    console.log(areaId);
    console.log(this.data.jieguo2);
  },
  //滚动选择的时候触发事件
  bindChange: function (e) {
    //这里是获取picker-view内的picker-view-column 当前选择的是第几项
    console.log(e.detail.value)
    const val = e.detail.value
    this.setData({
      sheng_index: val[0],
      shi_index: val[1],
      qu_index: val[2],
      jieguo2: e.detail.value
    })
    this.jilian();
    console.log(val);

    console.log(this.data.jieguo);
  },
  //这里是判断省市名称的显示
  jilian: function () {
    var that = this,
      shengshi = that.data.shengshi,
      sheng = [],
      shi = [],
      qu = [],
      qu_index = that.data.qu_index,
      shi_index = that.data.shi_index,
      sheng_index = that.data.sheng_index;
    //遍历所有的省，将省的名字存到sheng这个数组中
    for (let i = 0; i < shengshi.length; i++) {
      sheng.push(shengshi[i].ProvinceName)
    }
    console.log(shengshi[sheng_index])
    if (shengshi[sheng_index].CityLise) {//这里判断这个省级里面有没有市（如数据中的香港、澳门等就没有写市）
      if (shengshi[sheng_index].CityLise[shi_index]) {//这里是判断这个选择的省里面，有没有相应的下标为shi_index的市，因为这里的下标是前一次选择后的下标，比如之前选择的一个省有10个市，我刚好滑到了第十个市，现在又重新选择了省，但是这个省最多只有5个市，但是这时候的shi_index为9，而这里的市根本没有那么多，所以会报错
        //这里如果有这个市，那么把选中的这个省中的所有的市的名字保存到shi这个数组中
        for (let i = 0; i < shengshi[sheng_index].CityLise.length; i++) {
          shi.push(shengshi[sheng_index].CityLise[i].CityName);
        }
        console.log('执行了区级判断');

        if (shengshi[sheng_index].CityLise[shi_index].DistrictLise) {//这里是判断选择的这个市在数据里面有没有区县
          if (shengshi[sheng_index].CityLise[shi_index].DistrictLise[qu_index]) {//这里是判断选择的这个市里有没有下标为qu_index的区县，道理同上面市的选择
            console.log('这里判断有没有进区里');
            //有的话，把选择的这个市里面的所有的区县名字保存到qu这个数组中
            for (let i = 0; i < shengshi[sheng_index].CityLise[shi_index].DistrictLise.length; i++) {
              console.log('这里是写区得');
              qu.push(shengshi[sheng_index].CityLise[shi_index].DistrictLise[i].DistrictName);
            }
          } else {
            //这里和选择市的道理一样
            that.setData({
              qu_index: 0
            });
            for (let i = 0; i < shengshi[sheng_index].CityLise[shi_index].DistrictLise.length; i++) {
              qu.push(shengshi[sheng_index].CityLise[shi_index].DistrictLise[i].DistrictName);
            }
          }
        } else {
          //如果这个市里面没有区县，那么把这个市的名字就赋值给qu这个数组
          qu.push(shengshi[sheng_index].CityLise[shi_index].CityName);
        }
      } else {
        //如果选择的省里面没有下标为shi_index的市，那么把这个下标的值赋值为0；然后再把选中的该省的所有的市的名字放到shi这个数组中
        that.setData({
          shi_index: 0
        });
        for (let i = 0; i < shengshi[sheng_index].CityLise.length; i++) {
          shi.push(shengshi[sheng_index].CityLise[i].CityName);
        }

      }
    } else {
      //如果该省级没有市，那么就把省的名字作为市和区的名字
      shi.push(shengshi[sheng_index].ProvinceName);
      qu.push(shengshi[sheng_index].ProvinceName);
    }
    //选择成功后把相应的数组赋值给相应的变量

    //有时候网络慢，会出现区县选择出现空白，这里是如果出现空白那么执行一次回调
    console.log(sheng.length)
    if (sheng.length == 0 && shi.length == 0 && qu.length == 0) {
      that.jilian();
      console.log('这里执行了回调');
      // console.log();
    }
    console.log(sheng[that.data.sheng_index]);
    console.log(shi[that.data.shi_index]);
    console.log(qu[that.data.qu_index]);
    //把选择的省市区都放到jieguo中
    let jieguo = {
      sheng: sheng[that.data.sheng_index],
      shi: shi[that.data.shi_index],
      qu: qu[that.data.qu_index]
    };
    console.log(sheng)
    that.setData({
      jieguo: jieguo,
      sheng: sheng,
      shi: shi,
      qu: qu
    });

  },
  // 获取项目名称
  hqxmname: function (e) {
    var that = this
    that.setData({
      xmname: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqgsname: function (e) {
    var that = this
    that.setData({
      gsname: e.detail.value.replace(/\s+/g, '')
    })
  },

  // 获取联系人
  hqlxr: function (e) {
    var that = this
    that.setData({
      xmlxr: e.detail.value.replace(/\s+/g, '')
    })
  },
  // 获取联系人dianhua
  hqphone: function (e) {
    var that = this
    that.setData({
      xmphone: e.detail.value.replace(/\s+/g, '')
    })
  },

  // 获取联系人dianhua
  huxqms: function (e) {
    var that = this
    that.setData({
      xmxqms: e.detail.value.replace(/\s+/g, '')
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
    let xmname = that.data.xmname
    let gsname = that.data.gsname
    let xmlxr = that.data.xmlxr
    let xmphone = that.data.xmphone
    let xmxqms = that.data.xmxqms
    let sheng = that.data.povinceId
    let shi = that.data.cityId
    let qu = that.data.areaId
    let leixing = that.data.leixing
    let uploadpic = that.data.uploadpic
    let dizhi = that.data.dizhi
    let shuju = {
      puid: userid,
      pid: that.data.xmid,
      ptitle: xmname,
      renc: that.data.rencaiid,
      chanz: that.data.chanzhiid,
      shuis: that.data.shuishouid,
      zhuanl: that.data.zhuanliid,

    }
    if (leixing == '请选择') {
    } else {
      shuju.typeId = that.data.yshuju[that.data.leixingid].id
    }
    if (xmname == '' || xmname == undefined || xmname == null) {
      wx.showToast({
        title: '请输入项目名称',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    if (gsname == '' || gsname == undefined || gsname == null) {

    } else {
      shuju.gongsi = gsname
    }
    if (dizhi == '请选择') {

    } else {
      shuju.sid = that.data.povinceId
      shuju.cid = that.data.cityId
    }
    if (xmlxr == '' || xmlxr == undefined || xmlxr == null) {

    } else {
      shuju.plinkpeople = xmlxr
    }
    if (xmphone == '' || xmphone == undefined || xmphone == null) {

    } else {
      shuju.plinkphone = xmphone
    }
    if (xmxqms == '' || xmxqms == undefined || xmxqms == null) {

    } else {
      shuju.pcontent = xmxqms
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
                url: that.data.href + 'api/User/XCXProjectIssueChange',
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
        url: that.data.href + 'api/User/XCXProjectIssueChange',
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