import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './identify.scss'

export default class Identify extends Component {

  config: Config = {
    navigationBarTitleText: '识图'
  }

  render () {
    return (
      <View>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
