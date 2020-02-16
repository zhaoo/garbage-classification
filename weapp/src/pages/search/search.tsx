import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar } from 'taro-ui'
import graphql from '../../api/graphql'
import { searchGarbage } from '../../api/gql'
import './search.scss'

type PageState = {
  searchList: Array<{
    name: string,
    categoryId: string,
    description: string
  }>,
  keyword: string,
}

export default class search extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      searchList: [],
      keyword: '',
    }
  }

  componentWillMount() {
    Taro.setNavigationBarTitle({ title: this.$router.params.keyword })
    this.setState({ keyword: this.$router.params.keyword })
    this.getSearch()
  }

  config: Config = {
    navigationBarTitleText: '搜索结果'
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

  getSearch = async () => {
    const res = await graphql.query({ query: searchGarbage, variables: { keyword: this.$router.params.keyword } })
    this.setState({ searchList: res.data.searchGarbage })
  }

  renderResult = () => {
    const { searchList, keyword } = this.state
    return (
      <View>
        <AtList>
          {searchList && searchList.map((item, index) => {
            return (
              <AtListItem
                title={item.name}
                arrow='right' key={index}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/type/type?id=${item.categoryId}&name=${item.name}&description=${item.description}&type=garbage`
                  })
                }}
              />
            )
          })}
        </AtList>
        {searchList.length === 0 && (
          <View style='text-align: center;'>
            <Text className='text' onClick={() => { Taro.navigateTo({ url: `/pages/add/add?name=${keyword}` }) }}>没有找到匹配内容，点击添加该内容</Text>
          </View>
        )}
      </View>
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
      <View className='search'>
        {this.renderSearch()}
        {this.renderResult()}
      </View>
    )
  }
}
