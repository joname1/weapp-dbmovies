const searchURL = 'https://api.douban.com/v2/movie/search';
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        movies: []
    },
    onLoad: function() {

    },
    showInput: function() {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function() {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function() {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function(e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    searchit: function(e) {
        if (!e.detail.value) {
            return;
        }
        wx.showToast({
            title: '搜索中...',
            icon: 'loading',
            duration: 10000
        });
        var that = this;
        wx.request({
            url: searchURL + '?q=' + e.detail.value,
            data: {},
            header: {
                "Content-Type": "json"
            },
            success: function(res) {
                wx.hideToast();
                var data = res.data;
                that.setData({
                    movies: data.subjects
                })
            }
        })
    },
    onReachBottom: function(e) {
        console.log(e)
        var that = this;
        wx.request({
            url: searchURL + '?q=' + e.detail.value + '?start=25&count=50',
            data: {},
            header: {
                "Content-Type": "json"
            },
            success: function(res) {
                var data = res.data;
                that.setData({
                    movies: data.subjects
                })
            }
        });
    }
});
