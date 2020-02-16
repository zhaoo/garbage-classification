import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import Home from './pages/home/home'
import './app.scss'

class App extends Component {

  config: Config = {
    pages: [
      'pages/home/home',
      'pages/identify/identify',
      'pages/database/database',
      'pages/photo/photo',
      'pages/album/album',
      'pages/type/type',
      'pages/search/search',
      'pages/add/add'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#409EFF',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: "#666666",
      selectedColor: "#409EFF",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/home/home",
        iconPath: "./assets/tabbar/home.png",
        selectedIconPath: "./assets/tabbar/home-active.png",
        text: "首页"
      },
      {
        pagePath: "pages/identify/identify",
        iconPath: "./assets/tabbar/camera.png",
        selectedIconPath: "./assets/tabbar/camera-active.png",
        text: "识图"
      },
      {
        pagePath: "pages/database/database",
        iconPath: "./assets/tabbar/database.png",
        selectedIconPath: "./assets/tabbar/database-active.png",
        text: "字典"
      }]
    }
  }

  render() {
    return (
      <Home />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
