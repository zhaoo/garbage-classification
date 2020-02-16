import Taro from '@tarojs/taro'
import ApolloClient from 'apollo-boost'
import config from '../config'

const fetch = (url, { body: data, ...fetchOptions }) => {
  return Taro.request({ url, data, ...fetchOptions, dataType: 'txt', responseType: 'text' })
    .then((res) => {
      res.text = () => Promise.resolve(res.data)
      return res
    }).catch(error => {
      console.error(error)
    },
  );
}

const uri = config.graphqlUrl

export default new ApolloClient({ uri, fetch })