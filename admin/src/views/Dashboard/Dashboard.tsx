import React, { Component } from 'react'
import NumberCard from './components/NumberCard'
import { Col } from 'antd'
import { dashboard } from '../../api/gql'
import graphql from '../../api/graphql'
import './Dashboard.scss'

class Dashboard extends Component {
  state = {
    numberData: {
      garbageCount: 0
    }
  }

  async componentDidMount() {
    await this.getNumberData()
  }

  getNumberData = async () => {
    const res: any = await graphql.query({ query: dashboard })
    this.setState({ numberData: res.data.dashboard })
  }

  renderNumberCard = () => {
    const { numberData } = this.state
    const { garbageCount } = numberData
    const numbers = [
      { icon: 'delete', color: '#67C23A', title: '垃圾总数', number: garbageCount },
      { icon: 'search', color: '#409EFF', title: '查询次数', number: 302 },
      { icon: '', color: '', title: '', number: 200 },
      { icon: '', color: '', title: '', number: 200 },
    ]
    return (
      <div className='number-card'>
        {numbers.map((item, index) => {
          return (
            <Col key={index} lg={6} md={12} className='item'>
              <NumberCard {...item} />
            </Col>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className='dashboard'>
        {this.renderNumberCard()}
      </div>
    )
  }
}

export default Dashboard