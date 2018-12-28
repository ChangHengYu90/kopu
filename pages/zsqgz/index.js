
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    href: app.data.href,
    titleid:2,
    page:1,
    useid: wx.getStorageSync('userid')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.gettuijian()
    
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
    var that = this
    let id = that.data.titleid
    let yeshu = parseInt(that.data.page)+1
    that.setData({
      page:yeshu
    })
    if (id == 1) {
      that.getguanzhu()
    } else if (id == 2) {
      that.gettuijian()
    } else if (id == 3) {
      that.getxm()
    } else if (id == 4) {
      that.getzaiti()
    } else if (id == 5) {
      that.getquyu()
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gosy: function () {
    wx.reLaunch({
      url: '../homepage/index',
    })
  },
  gokopu: function () {
    wx.reLaunch({
      url: '../kopuhao/index',
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
    } else {
      wx.reLaunch({
        url: '../my/index',
      })
    }
  },
  chooseitle:function(e){
    var that = this
   let id = e.currentTarget.id
    let titleid = that.data.titleid
    if (id == titleid){
       return
    }else{
      that.setData({
        titleid: id,
        page: 1,
      })
      if(id==1){
        that.getguanzhu()
      } else if (id == 2){
        that.gettuijian()
      } else if (id == 3) {
        that.getxm()
      } else if (id == 4){
        that.getzaiti()
      }else if(id==5){
        that.getquyu()
      }
      
    }
  },
  // 关注
  getguanzhu(){
    var that = this
    wx.request({
      url: that.data.href + 'api/Dynaminc/AttentionKOPUInfoList',
      method: 'POST',
      data: {
        userId: that.data.useid,
        page:that.data.page,
        number:10,
      },    //参数为键值对字符串
      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for(let i=0;i<shuju.length; i++){
          if (shuju[i].Img.length>0){
            let a  = shuju[i].Img.substring(0, shuju[i].Img.length-1)
            shuju[i].Img = a.split('&')
          }
        }
        if (that.data.page>1){
          that.setData({
            gzlist: that.data.gzlist.concat(shuju)
          })
        }else{
          that.setData({
            gzlist: shuju
          })
        }
        
      }

    })
  },
  // 推荐
  gettuijian() {
    var that = this
    wx.request({
      url: that.data.href + 'api/Attract/NewsList',
      method: 'POST',
      data: {

        type: 1,
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串
      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length; i++) {
          if (shuju[i].imgurl.length > 0) {
            let a = shuju[i].imgurl.substring(0, shuju[i].imgurl.length - 1)
            shuju[i].imgurl = a.split('&')

          }
        }
        if (that.data.page > 1) {
          that.setData({
            tjlist: that.data.tjlist.concat(shuju)
          })
        } else {
          that.setData({
            tjlist: shuju
          })
        }
       
      }

    })
  },
  // 推项目
  getxm() {
      var that = this
      wx.request({
        url: that.data.href + 'api/House/HotProject',
        method: 'POST',
        data: {
          page: that.data.page,
          number: 10,
        },    //参数为键值对字符串
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          console.log(res.data)
          let shuju = res.data.data
          for (let i = 0; i < shuju.length; i++) {
            if (shuju[i].pimage.length > 0) {
              let a = shuju[i].pimage.substring(0, shuju[i].pimage.length - 1)
              shuju[i].pimage = a.split('&')

            }
          }
          if (that.data.page > 1) {
            that.setData({
              xmlist: that.data.xmlist.concat(shuju)
            })
          } else {
            that.setData({
              xmlist: shuju
            })
          }
        }

      })

  },
  // 载体
  getzaiti() {
    var that = this
    wx.request({
      url: that.data.href + 'api/House/HotFyList',
      method: 'POST',
      data: {
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串
      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length; i++) {
          if (shuju[i].imgUrl.length > 0) {
            let a = shuju[i].imgUrl.substring(0, shuju[i].imgUrl.length - 1)
            shuju[i].imgUrl = a.split('&')

          }
        }
        if (that.data.page > 1) {
          that.setData({
            ztlist: that.data.ztlist.concat(shuju)
          })
        } else {
          that.setData({
            ztlist: shuju
          })
        }
      }

    })
  },
  //区域
  getquyu() {
    var that = this
    wx.request({
      url: that.data.href + 'api/House/HotArea',
      method: 'POST',
      data: {

        // type: 1,
        page: that.data.page,
        number: 10,
      },    //参数为键值对字符串
      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data
        for (let i = 0; i < shuju.length; i++) {
          if (shuju[i].imgurl.length > 0) {
            let a = shuju[i].imgurl.substring(0, shuju[i].imgurl.length - 1)
            shuju[i].imgurl = a.split('&')

          }
        }
     
        if (that.data.page > 1) {
          that.setData({
            qylist: that.data.qylist.concat(shuju)
          })
        } else {
          that.setData({
            qylist: shuju
          })
        }
      }

    })
  },
  // 项目点赞
  xmdianz:function(e){
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask:true,
    })
    console.log(id)
    wx.request({
      url: that.data.href + 'api/Project/PraiseAdd',
      method: 'get',
      data: {
        id: id
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code==200){
          let xmlist = that.data.xmlist
          xmlist[index].like = res.data.data
          that.setData({
            xmlist: xmlist
          })
        }
        wx.showToast({
          title: res.data.message,
          icon:'none',
          mask:true,
          duration:1500
        })
        
      },
      fail:function(){
        wx.hideLoading()
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          mask: true,
          duration: 1500
        })
      }

    })
  },
  // 推荐点赞
  tjdainz: function (e) {
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    wx.request({
      url: that.data.href + 'api/zhaoshang/PraiseAdd',
      method: 'get',
      data: {
        id: id
      },    //参数为键值对字符串
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          if(that.data.titleid==2){
            let tjlist = that.data.tjlist
            tjlist[index].like = res.data.data
            that.setData({
              tjlist: tjlist
            })
          } else if (that.data.titleid == 5){
            let qylist = that.data.qylist
            qylist[index].like = res.data.data
            that.setData({
              qylist: qylist
            })
          }
        }
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          mask: true,
          duration: 1500
        })

      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          mask: true,
          duration: 1500
        })
      }

    })
  },
  // 载体点赞
  ztdianz: function (e) {
    let id = e.currentTarget.id
    let index = e.currentTarget.dataset.index
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    wx.request({
      url: that.data.href + 'api/House/PraiseAdd',
      method: 'get',
      data: {
        id: id
      },    //参数为键值对字符串
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          let xmlist = that.data.xmlist
          xmlist[index].like = res.data.data
          that.setData({
            xmlist: xmlist
          })
        }
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          mask: true,
          duration: 1500
        })

      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          mask: true,
          duration: 1500
        })
      }

    })
  },
  longan:function(e){
    console.log(22)
    var that = this
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let gzlist = that.data.gzlist
  
    wx.showModal({
      title: '提示',
      content: '是否取消关注',
      success(res) {
        if (res.confirm) {
          // 
          wx.request({
            url: that.data.href + 'api/Dynaminc/CancelAttentionKOPU',
            method: 'POST',
            data: {
              userId:wx.getStorageSync('userid'),
              DynamicId:id
            },    //参数为键值对字符串
            success: function (res) {
              console.log(res.data)
              if(res.data.code==200){
                
                gzlist.splice(index, 1)
                that.setData({
                  gzlist: gzlist
                })
              }
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                mask: true,
                duration: 1500
              })
            
            },
            fail:function(){
              wx.showToast({
                title: '网络异常，请稍后再试',
                icon: 'none',
                mask: true,
                duration: 1500
              })
            }

          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 关注
  godongtaixq:function(e){
    var that = this
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '../dongtaixq/index?id=' + id,
    })
  },
  // tuijian详情
  golooktjxq: function (e) {
    var that = this
    let id = e.currentTarget.id
    let con = e.currentTarget.dataset.content
    let pic = e.currentTarget.dataset.image
    let index = e.currentTarget.dataset.index
    let content = that.data.tjlist
    wx.setStorageSync('quyu', content[index])
    wx.navigateTo({
      url: '../tjxq/index?id=' + id + "&content=" + encodeURIComponent(con) + "&image=" + encodeURIComponent(pic),
    })
  },
  // 区域详情
  golookxq: function (e) {
    var that = this
    let id = e.currentTarget.id
    let con = e.currentTarget.dataset.content
    let pic = e.currentTarget.dataset.image
    let index = e.currentTarget.dataset.index
    let content = that.data.qylist
    wx.setStorageSync('quyu', content[index])
    wx.navigateTo({
      url: '../wangye/index?id=' + id + "&content=" + encodeURIComponent(con) + "&image=" + encodeURIComponent(pic),
    })
  },
  golookxqzt: function (e) {
    var that = this
    let id = e.currentTarget.id
    let con = e.currentTarget.dataset.content
    let index = e.currentTarget.dataset.index
    let content = that.data.ztlist
    wx.setStorageSync('zaitixq', content[index])
    wx.navigateTo({
      url: '../zaitixq/index?id='+id
    })
  },
  golookxqxm: function (e) {
    var that = this
    let id = e.currentTarget.id
    var index = e.currentTarget.dataset.index
    // that.data.xmlist[index].Time = that.data.xmlist[index].Time.substring(0, 10)
    wx.setStorageSync('syxm', that.data.xmlist[index])
    wx.navigateTo({
      url: '../xiangmxq/index?id=' + id,
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
    } else {
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
  }
})