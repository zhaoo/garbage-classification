import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import Search from './pages/search/search'
import './app.scss'

class App extends Component {

  config: Config = {
    pages: [
      'pages/search/search',
      'pages/identify/identify',
      'pages/database/database',
      'pages/photo/photo',
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
        pagePath: "pages/search/search",
        iconPath: "./assets/tabbar/search.png",
        selectedIconPath: "./assets/tabbar/search-active.png",
        text: "查询"
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
      <Search />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
