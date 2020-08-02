import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtFab } from 'taro-ui'
import graphql from '../../api/graphql'
import { category } from '../../api/gql'
import DataList from './dataList/dataList'
import './database.scss'

type PageState = {
  categoryList: Array<{
    name: string,
    id: string
  }>,
  current: number
}

export default class Database extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      categoryList: [],
      current: 0
    }
  }

  componentDidMount() {
    this.getCategory()
  }

  config: Config = {
    navigationBarTitleText: '字典'
  }

  getCategory = async () => {
    const res = await graphql.query({ query: category })
    this.setState({ categoryList: res.data.category })
  }

  handleTabClick(value) {
    this.setState({
      current: value
    })
  }

  renderCategory = () => {
    const { categoryList, current } = this.state
    return (
      <AtTabs
        current={current}
        scroll
        tabDirection='vertical'
        height='200vh'
        tabList={categoryList.map((item) => { return ({ title: item.name }) })}
        onClick={this.handleTabClick.bind(this)}
      >
        {categoryList && categoryList.map((item, key) => {
          return (
            <AtTabsPane tabDirection='vertical' current={current} index={key} key={key}>
              <DataList categoryId={item.id} />
            </AtTabsPane>
          )
        })}
      </AtTabs>
    )
  }

  renderAddGarbage = () => {
    return (
      <View className='fab'>
        <AtFab onClick={() => { Taro.navigateTo({ url: `/pages/add/add` }) }} size='normal'>
          <View className='at-icon at-icon-add'></View>
        </AtFab>
      </View>
    )
  }

  render() {
    return (
      <View className='database'>
        {this.renderCategory()}
        {this.renderAddGarbage()}
      </View>
    )
  }
}
