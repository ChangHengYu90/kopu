var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    page:1,
    ztid:'kong'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      ztid: options.id,
      typeid: options.type
    })
    wx.removeStorage({
      key: 'zaitixq',
      success: function(res) {

      },
    })
    let data = {
      page: that.data.page,
      number: 10,
      type: that.data.typeid,
    }
    if (options.id != undefined && options.id !=null){
      data.wenzhangid = options.id
    }
    that.getlist(data)
    
    
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
    wx.removeStorage({
      key: 'zfzaitixq',
      success: function (res) {

      },
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
      var that = this
      let yeshu = parseInt(that.data.page)+1
    console.log(that.data.typeid)
    console.log(that.data.ztid)
    let data = {
      page: yeshu,
      number: 10,
      type: that.data.typeid,
    }
    if (that.data.ztid != undefined && that.data.ztid != null) {
      data.wenzhangid = that.data.ztid
    }
    that.setData({
      page:yeshu
    })
    that.getlist(data)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getlist(data) {
    console.log(data)
    var that = this
    wx.request({
      url: that.data.href + 'api/Zhaoshang/ZskProjectList',
      method: 'POST',
      data: data,    //参数为键值对字符串
      success: function (res) {
        console.log(res.data)
        let con = res.data.data
        // for (let i = 0; i < con.length; i++) {
        //   con[i].imgUrl = con[i].imgUrl.split('&')
        // }
        console.log(con)
        if(that.data.page>1){
          that.setData({
            sjlist: that.data.sjlist.concat(res.data.data)
          })
        }else{
          that.setData({
            sjlist: res.data.data
          })
        }
        
      }

    })
  },
  golookxq:function(e){
    var that = this
    let index = e.currentTarget.dataset.index
    let shuju = that.data.sjlist
    wx.setStorageSync('zfzaitixq', shuju[index])
    wx.navigateTo({
      url: '../zfzaitixq/index?type=' + that.data.typeid,
    })
  }
})