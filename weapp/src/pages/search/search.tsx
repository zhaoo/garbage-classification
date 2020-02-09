import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './search.scss'

type PageState = {
  value: string
}

export default class Search extends Component<{}, PageState> {
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }

  componentWillMount() {
  }

  config: Config = {
    navigationBarTitleText: '查询'
  }

  onChange (value) {
    this.setState({
      value: value
    })
  }

  render () {
    return (
      <View>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
      </View>
    )
  }
}
