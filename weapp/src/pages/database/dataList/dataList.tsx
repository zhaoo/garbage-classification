import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import graphql from '../../../api/graphql'
import { garbageByCategoryId } from '../../../api/gql'
import './dataList.scss'

type PageState = {
  garbageList: Array<{
    name: string,
    categoryId: string,
  }>
}

type PageStateProps = {
  categoryId: string
}

interface GarbageList {
  props: PageStateProps;
}

class GarbageList extends Component<{}, PageState, PageStateProps> {
  constructor(props) {
    super(props)
    this.state = {
      garbageList: []
    }
  }

  async componentDidMount() {
    this.getGarbageList()
  }

  getGarbageList = async () => {
    const { categoryId } = this.props
    const res = await graphql.query({ query: garbageByCategoryId, variables: { categoryId: categoryId } })
    this.setState({ garbageList: res.data.garbageByCategoryId })
  }

  renderGarbageList = () => {
    const { garbageList } = this.state
    return (
      <AtList>
        {garbageList && garbageList.map((item, index) => {
          return (
            <AtListItem title={item.name} key={index} onClick={() => { Taro.navigateTo({ url: `/pages/type/type?id=${item.categoryId}&name=${item.name}&type=garbage` }) }} />
          )
        })}
      </AtList>
    )
  }

  render() {
    return (
      <View>
        {this.renderGarbageList()}
      </View>
    )
  }
}

export default GarbageList
