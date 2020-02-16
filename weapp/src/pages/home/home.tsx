import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtGrid } from 'taro-ui'
import graphql from '../../api/graphql'
import { category } from '../../api/gql'
import './home.scss'

type PageState = {
  keyword: string,
  categoryList: Array<{
    name: string,
    id: string,
    image: string
  }>,
}

export default class Home extends Component<{}, PageState> {
  constructor() {
    super(...arguments)
    this.state = {
      keyword: '',
      categoryList: [],
    }
  }

  componentWillMount() {
    this.getCategory()
  }

  config: Config = {
    navigationBarTitleText: '首页'
  }

  getCategory = async () => {
    const res = await graphql.query({ query: category })
    this.setState({ categoryList: res.data.category })
  }

  onChange(value) {
    this.setState({
      keyword: value
    })
  }

  onActionClick() {
    const { keyword } = this.state
    if (keyword) {
      Taro.navigateTo({ url: `/pages/search/search?keyword=${keyword}` })
    } else {
      Taro.showToast({
        title: '请输入关键词',
        icon: 'none',
        duration: 2000
      })
    }
  }

  renderCategoryList = () => {
    const { categoryList } = this.state
    return (
      <AtGrid className='grid' hasBorder={false} columnNum={2} onClick={(item: any) => { Taro.navigateTo({ url: `/pages/type/type?id=${item.id}&name=${item.value}&type=category` }) }} data={categoryList.map((item) => {
        return ({
          image: item.image,
          value: item.name,
          id: item.id
        })
      })}
      />
    )
  }

  renderSearch = () => {
    return (
      <AtSearchBar
        value={this.state.keyword}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
    )
  }

  render() {
    return (
      <View className='home'>
        {this.renderSearch()}
        {this.renderCategoryList()}
      </View>
    )
  }
}
