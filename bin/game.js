require("weapp-adapter.js");
require("code.js");
const loadTask = wx.loadSubpackage({
    name: 'res', // name 可以填 name 或者 root
    success: function(res) {
      // 分包加载成功后通过 success 回调
    },
    fail: function(res) {
      // 分包加载失败通过 fail 回调
    }
  })
  
  loadTask.onProgressUpdate(res => {
    console.log('下载进度', res.progress)
    console.log('已经下载的数据长度', res.totalBytesWritten)
    console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
  })