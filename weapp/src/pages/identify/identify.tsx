import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './identify.scss'

export default class Identify extends Component {

  config: Config = {
    navigationBarTitleText: '识图'
  }

  render() {
    return (
      <View className='identify'>
        <AtButton type='primary' className='btn' onClick={() => { Taro.navigateTo({ url: `/pages/photo/photo` }) }}><View className='at-icon at-icon-camera'></View>拍照</AtButton>
        <AtButton type='primary' className='btn btn-margin' onClick={() => { Taro.navigateTo({ url: `/pages/album/album` }) }}><View className='at-icon at-icon-image'></View>相册</AtButton>
      </View>
    )
  }
}
