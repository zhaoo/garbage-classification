import Taro from '@tarojs/taro'
import config from '../config'

export default function request({ url, method, data, outside = false, contentType='application/json' }) {
  return new Promise((resolve, reject) => {
    Taro.request({
      data: data,
      method: method || 'GET',
      url: outside ? url : (config.baseUrl + url),
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
