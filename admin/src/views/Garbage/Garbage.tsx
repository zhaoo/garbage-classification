import React, { Component } from 'react'
import { Table, Button, Popconfirm, notification } from 'antd'
import { garbage, deleteGarbage, category } from '../../api/gql'
import graphql from '../../api/graphql'
import './Garbage.scss'

interface IGarbage {
  name: string,
  id: string,
  categoryId: string
}

interface ICategory {
  name: string,
  id: string
}

interface IState {
  page: {
    current: number,
    limit: number
  },
  list: Array<IGarbage>,
  total: number,
  loading: boolean,
  categoryList: Array<ICategory>,
  garbage: IGarbage
}

class Garbage extends Component<{}, IState> {
  state = {
    page: {
      current: 1,
      limit: 10
    },
    list: [],
    total: 0,
    loading: true,
    categoryList: [],
    garbage: {
      id: '',
      name: '',
      categoryId: ''
    }
  }

  async componentDidMount() {
    await this.getCategory()
    await this.getList()
  }

  getList = async () => {
    const { page } = this.state
    const res: any = await graphql.query({ query: garbage, variables: { current: page.current, limit: page.limit } })
    const list = res.data.garbage.list
    for (let item of list) {
      let name: string = ''
      let i: ICategory
      for (i of this.state.categoryList) {
        if (i.id === item.categoryId) {
          name = i.name
        }
      }
      item.categoryName = name
    }
    this.setState({ list: list, total: res.data.garbage.total, loading: false })
  }

  getCategory = async () => {
    const res: any = await graphql.query({ query: category })
    this.setState({ categoryList: res.data.category })
  }

  handleChangePage = async (page: number) => {
    await this.setState({ page: { ...this.state.page, current: page }, loading: true })
    await this.getList()
  }

  handleDelete = async (id: string, index: number) => {
    await graphql.mutate({ mutation: deleteGarbage, variables: { id: id } })
    const arr = this.state.list
    arr.splice(index, 1)
    this.setState({ list: arr })
    notification['success']({
      message: '删除成功'
    })
  }

  renderDelete = (text: IGarbage, index: number) => {
    return (
      <Popconfirm
        title="是否删除该项？"
        okText="删除"
        cancelText="取消"
        okType='danger'
        onConfirm={() => { this.handleDelete(text.id, index) }}
      >
        <Button type="danger" icon="delete" className='btn' />
      </Popconfirm>
    )
  }

  renderEdit = (text: IGarbage) => {
    return (
      <Button type="primary" icon="edit" className='btn' />
    )
  }

  renderTable = () => {
    const { page, list, total, loading } = this.state
    const columns = [
      { title: '名称', dataIndex: 'name', key: 'name', width: 100 },
      { title: '类别', dataIndex: 'categoryName', key: 'categoryName', width: 100 },
      {
        title: '操作', width: 100, render: (text: IGarbage, index: number) => (
          <div>
            {this.renderDelete(text, index)}
            {this.renderEdit(text)}
          </div>
        )
      }
    ]
    return (
      <Table
        dataSource={list}
        columns={columns}
        rowKey='id'
        bordered
        pagination={{ current: page.current, total: total, onChange: this.handleChangePage }}
        className='table'
        loading={loading}
      />
    )
  }

  render() {
    return (
      <div className='garbage'>
        {this.renderTable()}
      </div>
    )
  }
}

export default Garbage