import request from './request';
import config from '../config'

export function baiduToken() {
  return request({
    url: 'https://aip.baidubce.com/oauth/2.0/token',
    method: 'get',
    data: {
      grant_type: config.baiduApi.grant_type,
      client_id: config.baiduApi.client_id,
      client_secret: config.baiduApi.client_secret
    },
    outside: true
  })
}

export function baiduSubjectDetection(token, data) {
  return request({
    url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/object_detect?access_token='+token,
    method: 'post',
    data: data,
    outside: true,
    contentType: 'application/x-www-form-urlencoded'
  });
}

export function baiduAdvancedGeneral(token, data) {
  return request({
    url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token='+token,
    method: 'post',
    data: data,
    outside: true,
    contentType: 'application/x-www-form-urlencoded'
  });
}