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
    }
  }

  async componentDidMount() {
    this.getBaiduToken()
    this.context = Taro.createCanvasContext('canvas', this.$scope)
  }

  config: Config = {
    navigationBarTitleText: '拍照'
  }

  getBaiduToken = async () => {
    const res: any = await baiduToken()
    this.setState({ baiduToken: res.access_token })
  }

  handleCanvas = async (base64, src) => {
    const subject: any = await baiduSubjectDetection(this.state.baiduToken, {
      image: base64
    })
    const { height, width, top, left } = subject.result
    const advance: any = await baiduAdvancedGeneral(this.state.baiduToken, {
      image: base64
    })
    const { keyword } = advance.result[0]
    this.context.drawImage(src, 0, 0)
    this.context.setStrokeStyle("#00ff00")
    this.context.setLineWidth(2)
    this.context.rect(left, top, width, height)
    this.context.stroke()
    this.context.setFillStyle("#00ff00")
    this.context.setFontSize(18)
    this.context.fillText(keyword, left, (top - 10))
    this.context.draw()
    typeof this.context.draw === 'function' && this.context.draw(true)
  }

  handleClickCamera = () => {
    const ctx = Taro.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: async (res) => {
        this.setState({ isCamera: false })
        const base64 = await url2base64(res.tempImagePath)
        this.handleCanvas(base64, res.tempImagePath)
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
          <View className='at-icon at-icon-reload' onClick={() => { this.handleClickPosition() }}></View>
          <View className='btn-camera' onClick={() => { this.handleClickCamera() }}>
            <View className='btn-camera-inside'></View>
          </View>
          <View className='at-icon at-icon-lightning-bolt'></View>
        </View>
      </View>
    )
  }

  renderView = () => {
    return (
      <View className='view'>
        <Canvas className='canvas' canvasId='canvas'></Canvas>
        <View className='button'></View>
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
