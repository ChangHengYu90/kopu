
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    array: ['一个月', '三个月', '半年', '一年'],
    array2: [ '三个月', '半年', '一年'],
    array3: ['8%', '10%', '12%', '15%'],
    index: 0,
    index2: 0,
    index3: 0,
   
    jfzq:'请选择缴费周期',
    jfzq2: '请选择分期期限',
    jfzq3: '请选择分期利息',
    sqlx:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

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
      jfzq: that.data.array[e.detail.value],
     
    })
  },
  bindPickerChange2: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      jfzq2: that.data.array2[e.detail.value],
     
    })
  },
  bindPickerChange3: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      jfzq3: that.data.array3[e.detail.value],
     
    })
  },
  // 获取项目名称
  hqxmname: function (e) {
    var that = this
    that.setData({
      biaoti: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqdizhi:function(e){
    var that = this
    that.setData({
      dizhi: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqmianji:function(){
    var that = this
    that.setData({
      mianji: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqdanjia:function(){
    var that = this
    that.setData({
      danjia: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqyuezu:function(){
    var that = this
    that.setData({
      yuezu: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqsqje:function(){
    var that = this
    that.setData({
      sqje: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqlxr: function () {
    var that = this
    that.setData({
      lxr: e.detail.value.replace(/\s+/g, '')
    })
  },
  hqphone: function () {
    var that = this
    that.setData({
      phone: e.detail.value.replace(/\s+/g, '')
    })
  },
  choosesqlx:function(e){
  let id = e.currentTarget.id
  this.setData({
    sqlx:id
  })
  },
  submit:function(){
    var that = this
    let biaoti = that.data.biaoti
    let dizhi = that.data.dizhi
    let mianji = that.data.mianji
    let danjia = that.data.danjia
    let yuezu = that.data.yuezu
    let sqje = that.data.sqje
    let lxr = that.data.lxr
    let phone = that.data.phone
    let jfzq = that.data.jfzq
    let jfzq2 = that.data.jfzq2
    let jfzq3 = that.data.jfzq3
    if (biaoti == '' || biaoti == undefined || biaoti == null){
      wx.showToast({
        title: '请输入公司/个人名称',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (dizhi == '' || dizhi == undefined || dizhi == null) {
      wx.showToast({
        title: '请输入地址',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (mianji == '' || mianji == undefined || mianji == null) {
      wx.showToast({
        title: '请输入房屋面积',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (danjia == '' || danjia == undefined || danjia == null) {
      wx.showToast({
        title: '请输入房屋单价',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (yuezu == '' || yuezu == undefined || yuezu == null) {
      wx.showToast({
        title: '请输入月租',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (jfzq =='请选择缴费周期'){
      wx.showToast({
        title: '请选择缴费周期',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    
    if (sqje == '' || sqje == undefined || sqje == null) {
      wx.showToast({
        title: '请输入申请金额',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (jfzq2 == '请选择分期期限') {
      wx.showToast({
        title: '请选择分期期限',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (jfzq3 == '请选择分期利息') {
      wx.showToast({
        title: '请选择分期利息',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (lxr == '' || lxr == undefined || lxr == null) {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    if (phone == '' || phone == undefined || phone == null) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$$/;
    if (!myreg.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.showLoading({
      title: '提交中...',
    })
    setTimeout(function(){
      wx.hideLoading()
      wx.showToast({
        title: '提交成功，审核中',
        icon: 'none',
        duration: 1000
      })
      setTimeout(function(){
        wx.navigateBack({
        
        })
      },1000)
    },1000)
  }
})