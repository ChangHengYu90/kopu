// pages/collectionlist/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    href: app.data.href,
    imgurl: app.data.imgurl,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let city = options.city
   
    wx.request({
      url: that.data.href + 'api/House/DistrictList',
      method: 'POST',
      data: {

      },    //参数为键值对字符串

      success: function (res) {
        console.log(res.data)
        let shuju = res.data.data.Province
        let citylist =''
        let sheng = ''
        let shi =''
        let qu=''
        let isyouqu =0
        console.log(shuju.length)
        for (let i = 0; i < shuju.length;i++){
          console.log(1111)
          for (let j = 0; j < shuju[i].CityLise.length; j++){
            console.log(222)
            if (city == shuju[i].CityLise[j].CityName){
              console.log(shuju[i].CityLise[j].CityName)
              sheng = shuju[i].ProvinceID
              shi = shuju[i].CityLise[j].ID
              if (shuju[i].CityLise[j].DistrictLise.length > 0) {
                citylist = shuju[i].CityLise[j].DistrictLise 
                console.log(citylist)
                isyouqu = 1
              }else{ 
              }
            }
          }
        }
      
        that.setData({
          city: city,
          sheng: sheng,
          shi: shi,
          qu: qu,
          isyouqu: isyouqu,
          citylist: citylist
        })
        
      }

    })
    // this.getgzlist()
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
  // getgzlist() {
  //   var that = this
  //   wx.request({
  //     url: that.data.href + 'api/ZCXZ/zcyzList', 
  //     method: 'POST',
  //     data: {
  //       page: that.data.page,
  //       number: 10,
  //     },    //参数为键值对字符串

  //     success: function (res) {
  //       console.log(res.data)
  //       let shuju = res.data.data
  //       // for (let i = 0; i < shuju.length; i++) {
  //       //   shuju[i].HeadImage = shuju[i].HeadImage.substring(3, shuju[i].HeadImage.length)
  //       //   let a = shuju[i].Img.substring(0, shuju[i].Img.length - 1)
  //       //   shuju[i].Img = a.split('&')
  //       // }
  //       that.setData({
  //         list: shuju
  //       })
  //     }

  //   })
  // },
  // golookxq: function (e) {
  //   console.log(e)
  //   let id = e.currentTarget.id
  //   let img = e.currentTarget.dataset.img
  //   let content = e.currentTarget.dataset.content
  //   let name = e.currentTarget.dataset.name

  //   wx.navigateTo({
  //     url: '../zsfwjsxq/index?id=' + id + "&content=" + encodeURIComponent(content) + "&img=" + encodeURIComponent(img) + "&name=" + encodeURIComponent(name),
  //   })
  // }
  golookxq:function(e){
   var that = this
    let sheng = that.data.sheng
    let shi = that.data.city
    let qu  = e.currentTarget.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../zcyzxq/index?name=' + name + "&sheng=" + sheng + "&shi=" + shi + "&qu="+qu,
    })
  }
})