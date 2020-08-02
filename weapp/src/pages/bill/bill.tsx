import Taro, { useEffect } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import './bill.scss'
import background from '../../assets/images/background.jpg'

//获取画布尺寸
const window = Taro.getSystemInfoSync()
const w = window.windowWidth * 0.8
const h = window.windowWidth * 0.8 * 9 / 5

const handleSaveImage = async () => {
  let res = await Taro.canvasToTempFilePath({
    x: 0,
    y: 0,
    width: w,
    height: h,
    canvasId: 'canvas',
    fileType: 'png'
  })
  let saveRes = await Taro.saveImageToPhotosAlbum({
    filePath: res.tempFilePath
  })
  if (saveRes.errMsg === 'saveImageToPhotosAlbum:ok') {
    Taro.showToast({
      title: '图片已保存到相册'
    })
  } else {
    Taro.showToast({
      title: '保存失败'
    })
  }
}

const renderCanvas = (text = '快来扫一扫吧') => {
  const ctx = Taro.createCanvasContext('canvas', null)
  //背景铺满
  ctx.drawImage(background, 0, 0, w, h)
  ctx.setFillStyle("#ffffff")
  //文字居中
  ctx.setFontSize(22)
  ctx.setTextAlign('center')
  ctx.fillText('口袋拾荒', w / 2, h - 200)
  ctx.setFontSize(12)
  ctx.fillText(`- ${text} -`, w / 2, h - 180)
  ctx.draw()
}

export default function Bill() {

  useEffect(() => {
    renderCanvas()
  }, [])

  return (
    <View className='bill'>
      <Canvas className='canvas' canvasId='canvas' onLongPress={handleSaveImage}></Canvas>
    </View>
  )
}

Bill.config = {
  navigationBarTitleText: '推广'
}