import Taro from '@tarojs/taro'

export default function request({ url, method, data, outside = false, contentType='application/json' }) {
  return new Promise((resolve, reject) => {
    Taro.request({
      data: data,
      method: method || 'GET',
      url: outside ? url : ('http://127.0.0.1:3000/api' + url),
      header: {
        'Content-Type': contentType,
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
