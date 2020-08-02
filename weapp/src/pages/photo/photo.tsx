import Taro, { Component, Config } from '@tarojs/taro'
import { View, Camera, Canvas } from '@tarojs/components'
import { baiduToken, baiduSubjectDetection, baiduAdvancedGeneral } from '../../api/api'
import { url2base64 } from '../../utils/func'
import './photo.scss'

type PageState = {
  camera: {
    position: string,
  },
  isCamera: boolean,
  baiduToken: string,
  keyword: string,
}

export default class Photo extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      camera: {
        position: 'back'
      },
      isCamera: true,
      baiduToken: '',
      keyword: ''
    }
  }

  async componentDidMount() {
    this.getBaiduToken()
  }

  config: Config = {
    navigationBarTitleText: '拍照'
  }

  getBaiduToken = async () => {
    const res: any = await baiduToken()
    this.setState({ baiduToken: res.access_token })
  }

  handleCanvas = (base64, src, photo) => {
    Taro.showLoading({
      title: '正在生成识别图'
    })
    const ctx = Taro.createCanvasContext('canvas', this.$scope)
    Taro.getSystemInfo({
      success: async res => {
        const w = res.windowWidth
        const h = res.windowHeight - 90
        const scale = {
          w: w / photo.width,
          h: h / photo.height
        }
        // 渲染照片
        ctx.drawImage(src, 0, 0, w, h)
        // 主体识别
        const subject: any = await baiduSubjectDetection(this.state.baiduToken, {
          image: base64
        })
        const { height, width, top, left } = subject.result
        // 物品识别
        const advance: any = await baiduAdvancedGeneral(this.state.baiduToken, {
          image: base64
        })
        const { keyword } = advance.result[0]
        this.setState({ keyword: keyword })
        // 渲染轮廓和文字
        ctx.setStrokeStyle("#00ff00")
        ctx.setLineWidth(2)
        ctx.rect(left, top, width, height)
        // 适配屏幕尺寸
        ctx.scale(scale.w, scale.h)
        ctx.setFillStyle("#00ff00")
        ctx.setFontSize(18 / scale.w)
        ctx.fillText(keyword, left, (top + 30))
        ctx.stroke()
        ctx.draw()
        Taro.hideLoading()
      }
    })
  }

  handleClickCamera = () => {
    const ctx = Taro.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: async (res) => {
        this.setState({ isCamera: false })
        // 图片缓存地址转base64
        const base64 = await url2base64(res.tempImagePath)
        // 获取图片实际尺寸
        const { width, height } = await Taro.getImageInfo({ src: res.tempImagePath })
        this.handleCanvas(base64, res.tempImagePath, { width, height })
      }
    })
  }

  handleClickPosition = () => {
    const { camera } = this.state
    if (camera.position === 'back') {
      this.setState({ camera: { ...camera, position: 'front' } })
    } else {
      this.setState({ camera: { ...camera, position: 'back' } })
    }
  }

  renderCamera = () => {
    const { camera } = this.state
    return (
      <View className='camera'>
        <Camera className='view' device-position={camera.position}></Camera>
        <View className='button'>
          <View className='at-icon at-icon-reload' hoverClass='active' onClick={() => { this.handleClickPosition() }}></View>
          <View className='btn-camera' hoverClass='active' onClick={() => { this.handleClickCamera() }}>
            <View className='btn-camera-inside'></View>
          </View>
          <View className='at-icon at-icon-lightning-bolt' hoverClass='active'></View>
        </View>
      </View>
    )
  }

  renderView = () => {
    const { keyword } = this.state
    return (
      <View className='view'>
        <Canvas className='canvas' canvasId='canvas'></Canvas>
        <View className='button'>
          <View className='at-icon at-icon-close-circle' hoverClass='active' onClick={() => { this.setState({ isCamera: true }) }}></View>
          <View className='at-icon at-icon-download-cloud' hoverClass='active' onClick={() => { Taro.navigateTo({ url: `/pages/bill/bill` }) }}></View>
          <View className='at-icon at-icon-check-circle' hoverClass='active' onClick={() => { Taro.navigateTo({ url: `/pages/search/search?keyword=${keyword}` }) }}></View>
        </View>
      </View>
    )
  }

  render() {
    const { isCamera } = this.state
    return (
      <View className='photo'>
        {isCamera ? this.renderCamera() : this.renderView()}
      </View>
    )
  }
}
