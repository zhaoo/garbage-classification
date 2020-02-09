import Taro from '@tarojs/taro'
import ApolloClient from 'apollo-boost'

const fetch = (url, { body: data, ...fetchOptions }) => {
  return Taro.request({ url, data, ...fetchOptions, dataType: 'txt', responseType: 'text' })
    .then((res) => {
      res.text = () => Promise.resolve(res.data)
      return res
    })
}

const uri = `http://localhost:3000/graphql`

export default new ApolloClient({ uri, fetch })