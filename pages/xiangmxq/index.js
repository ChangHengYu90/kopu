var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
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
    let con = wx.getStorageSync('hotpro')
   
    wx.request({
      url: that.data.href + 'api/House/ProjectDetail',
      method: 'get',
      data: {
        pid: options.id,

      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/json'
        // 'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res2) {
        console.log(res2.data)
        let shuju = res2.data.data
        var article = shuju.pcontent
        WxParse.wxParse('article', 'html', article, that, 5);
        if (shuju.ChuangTeam.length>0){
          for (let i = 0; i < shuju.ChuangTeam.length;i++){
            shuju.ChuangTeam[i].xing = shuju.ChuangTeam[i].name.substring(0,1)
          }

        }
        that.setData({
          xmxq: shuju
        })
      }

    })
    that.setData({
      // xmxq: con,
      pid: options.id
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

  // 下载
  btxiazai:function(){
    var that = this
    
    let userid = wx.getStorageSync('userid')
    console.log(wx.getStorageSync('userid'))
    if (userid == ' ' || userid == undefined || userid == null || userid == ''){
      wx.showToast({
        title: '您还未登录，请登录',
        icon:'none',
        duration:1000
      })
      setTimeout(function(){
        wx.navigateTo({
          url: '../login/index?id=1',
        })
      },1000)
      
    }else{
      wx.request({
        url: that.data.href + 'api/Project/BP',
        method: 'post',
        data: {
          id: userid,
          projectId: that.data.pid

        },    //参数为键值对字符串
        header: {
          //设置参数内容类型为x-www-form-urlencoded
          // 'content-type': 'application/json'
           'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res2) {
          console.log(res2.data)
          if (res2.data.code==200){
            if (res2.data.data=="null"){
              wx.showToast({
                title: res2.data.message,
                icon: 'none',
                duration: 1500,
              })
            }else if (res2.data.message =='下载次数为：0'){
              wx.showToast({
                title: res2.data.message,
                icon: 'none',
                duration: 1500,
              })
              }else{
              wx.showModal({
                title: '提示',
                content: '确定下载吗',
                success(res) {
                  if (res.confirm) {
                    const downloadTask = wx.downloadFile({
                      url: res2.data.data,
                      success: function (ret) {
                        var path = ret.tempFilePath;
                        wx.saveImageToPhotosAlbum({
                          filePath: path,
                          success(result) {
                            wx.showToast({
                              title: '保存成功',
                              icon: 'success',
                              duration: 1000
                            });

                          },
                          fail: function (result) {
                            console.log(result);
                            if (that.isAuthDeniedMsg(result.errMsg)) {
                              console.log("打开设置窗口");
                              wx.openSetting({
                                success(settingdata) {
                                  console.log(settingdata)
                                  if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                                    console.log("获取权限成功，再次点击图片保存到相册")
                                  } else {
                                    console.log("获取权限失败")
                                  }
                                }
                              })
                            } else {
                              that.showErrorMsg('错误')
                            }
                          }
                        })
                      }
                    })
                    downloadTask.onProgressUpdate((res) => {
                      console.log('下载进度', res.progress)
                      console.log('已经下载的数据长度', res.totalBytesWritten)
                      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
                    })

                    downloadTask.abort()
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
              
              }
          }else{
            wx.showToast({
              title: res2.data.message,
              icon:'none',
              duration:1500,
            })
          }
        }

      })

    }
  },
  // 对接
  jkdj: function () {
    var that = this
    let userid = wx.getStorageSync('userid')
    console.log(wx.getStorageSync('userid'))
    if (userid == ' ' || userid == undefined || userid == null || userid == '') {
      wx.showToast({
        title: '您还未登录，请登录',
        icon: 'none',
        duration: 1000
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index?id=1',
        })
      }, 1000)

    }else{
      wx.showModal({
        title: '提示',
        content: '确定申请吗？',
        success(res) {
          if (res.confirm) {
            //获取当前时间戳  
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            console.log("当前时间戳为：" + timestamp);

            //获取当前时间  
            var n = timestamp * 1000;
            var date = new Date(n);
            //年  
            var Y = date.getFullYear();
            //月  
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            //日  
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            //时  
            var h = date.getHours();
            //分  
            var m = date.getMinutes();
            //秒  
            var s = date.getSeconds();

            console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  
            wx.request({
              url: that.data.href + 'api/Project/Subscribe',
              method: 'POST',
              data:{
                pid: that.data.pid,
                  userid: userid,
                user: wx.getStorageSync('userxq').nickName,
                addtime: Y + "/" + M + "/" + D + " " + h + ":" + m + ":" + s,
                phone: wx.getStorageSync('userxq').phone,
              },    //参数为键值对字符串
              success: function (res) {
                
                console.log(res.data)
                if (res.data.code = 200) {
                  wx.showToast({
                    title: res.data.message,
                    icon: 'success',
                    duration: 1000
                  })
                }
              }

            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})