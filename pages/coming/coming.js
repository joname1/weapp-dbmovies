const hotURL = 'https://api.douban.com/v2/movie/coming_soon';
Page({
  data: {
    movies:[],
  },
  onLoad: function () {
        wx.showToast({
          title: '加载中...',
          icon: 'loading',
          duration: 10000
        });
    var that = this;
    wx.request({
      url: hotURL + '?start=0&count=50',
      data: {},
      header: {
        "Content-Type":"json"
      },
      success: function (res) {
        wx.hideToast();
         var data = res.data;
         that.setData({
          movies: data.subjects
         })
      }
    })
  }
});