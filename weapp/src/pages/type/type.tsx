import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Title from '../../components/title'
import graphql from '../../api/graphql'
import { categoryById } from '../../api/gql'
import './type.scss'

type PageState = {
  type: {
    name: string,
    image: string,
    type: string,
    description: string,
    tips: string[],
  }
}

export default class Type extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      type: {
        name: '',
        image: '',
        type: '',
        description: '',
        tips: []
      }
    }
  }

  componentWillMount() {
    Taro.setNavigationBarTitle({ title: this.$router.params.name })
    this.getType()
  }

  config: Config = {
    navigationBarTitleText: '分类'
  }

  getType = async () => {
    const res = await graphql.query({ query: categoryById, variables: { id: this.$router.params.id } })
    this.setState({ type: res.data.categoryById })
  }

  renderIntro = () => {
    const { type } = this.state
    const { name: paramsName, type: paramsType, description: paramsDescription } = this.$router.params
    return (
      <View className='intro'>
        {paramsType === 'category' && (
          <View className='image-container'>
            <Image src={type.image} className='image'></Image>
          </View>
        )}
        {paramsType === 'garbage' && (
          <View className='section'>
            <Title title={paramsName}></Title>
            <Text className='text tag'>{paramsName}</Text>
            <Text className='text divide'>属于</Text>
            <Text className='text tag'>{type.name}</Text>
            <Text className='text description'>{paramsDescription}</Text>
          </View>
        )}
        <View className='section'>
          <Title title={type.name}></Title>
          <Text className='text'>{type.description}</Text>
        </View>
        <View className='section'>
          <Title title='投放要求'></Title>
          {type.tips.map((item, index) => {
            return (
              <View key={index} className='tip'>
                <View className='at-icon at-icon-check check'></View>
                <Text className='text'>{item}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View className='type'>
        {this.renderIntro()}
      </View>
    )
  }
}
