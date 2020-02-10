import Taro from '@tarojs/taro'

export function url2base64(url) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: url,
      encoding: 'base64',
      success: res => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}