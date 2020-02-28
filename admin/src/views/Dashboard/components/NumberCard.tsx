import React, { Component } from 'react'
import { Card, Icon } from 'antd'
import CountUp from 'react-countup'
import './NumberCard.scss'

interface IProps {
  icon: string,
  color: string,
  title: string,
  number: number,
}

export default class NumberCard extends Component<IProps, {}> {
  render() {
    const { icon, color, title, number } = this.props
    return (
      <Card
        className='card'
        bordered={false}
        bodyStyle={{ padding: 32 }}
      >
        <Icon className='icon' style={{ color }} type={icon || 'question-circle'} />
        <div className='content'>
          <p className='title'>{title || 'No Title'}</p>
          <p className='number'>
            <CountUp
              start={0}
              end={number}
              duration={2.75}
              useEasing
              separator=","
            />
          </p>
        </div>
      </Card>
    )
  }
}