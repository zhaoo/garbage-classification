import React, { Component } from 'react'
import { Table, Button, Popconfirm, notification, Modal, Form, Input, Select } from 'antd'
import { garbage, deleteGarbage, category, createGarbage, updateGarbage } from '../../api/gql'
import { parseTime } from '../../utils/format'
import graphql from '../../api/graphql'
import './Garbage.scss'
const { Option } = Select
const { TextArea, Search } = Input

interface IGarbage {
  name: string,
  id: string,
  categoryId: string,
  description: string
}

interface ICategory {
  name: string,
  id: string
}

interface IState {
  page: {
    current: number,
    limit: number,
    keyword?: string,
    categoryId?: string,
  },
  list: Array<IGarbage>,
  total: number,
  loading: boolean,
  categoryList: Array<ICategory>,
  garbage: IGarbage,
  showForm: boolean,
  formType: string
}

class Garbage extends Component<{}, IState> {
  state = {
    page: {
      current: 1,
      limit: 10,
      keyword: '',
      categoryId: undefined,
    },
    list: [],
    total: 0,
    loading: true,
    categoryList: [],
    garbage: {
      id: '',
      name: '',
      categoryId: '',
      description: ''
    },
    showForm: false,
    formType: 'create'
  }

  async componentDidMount() {
    await this.getCategory()
    await this.getList()
  }

  getList = async () => {
    const { page } = this.state
    const res: any = await graphql.query({ query: garbage, variables: { current: page.current, limit: page.limit, keyword: page.keyword, categoryId: page.categoryId } })
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

  handleSelectChange = (value: string) => {
    this.setState({ garbage: { ...this.state.garbage, categoryId: value } })
  }

  handleBarSelectChange = async (value: string) => {
    await this.setState({ page: { ...this.state.page, categoryId: value } })
    await this.getList()
  }

  handleNameChange = (event: any) => {
    this.setState({ garbage: { ...this.state.garbage, name: event.target.value } })
  }

  handleDescriptionChange = (event: any) => {
    this.setState({ garbage: { ...this.state.garbage, description: event.target.value } })
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

  handleSubmit = async () => {
    const { garbage, formType } = this.state
    if (formType === 'create') {
      await graphql.mutate({ mutation: createGarbage, variables: garbage })
    }
    if (formType === 'edit') {
      await graphql.mutate({ mutation: updateGarbage, variables: garbage })
    }
    notification['success']({
      message: '提交成功'
    })
    this.setState({ showForm: false })
  }

  handleResetGarbage = () => {
    this.setState({
      garbage: {
        id: '',
        name: '',
        categoryId: '',
        description: ''
      }
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
      <Button type="primary" icon="edit" className='btn' onClick={() => {
        this.setState({
          showForm: true,
          formType: 'edit',
          garbage: text
        })
      }} />
    )
  }

  renderForm = () => {
    const { garbage, categoryList, showForm } = this.state
    return (
      <Modal
        visible={showForm}
        okText='提交'
        cancelText='取消'
        onCancel={() => { this.setState({ showForm: false }) }}
        onOk={() => { this.handleSubmit() }}
      >
        <Form>
          <Form.Item label='名称'>
            <Input value={garbage.name} onChange={this.handleNameChange} />
          </Form.Item>
          <Form.Item label='类型'>
            <Select value={garbage.categoryId} onChange={this.handleSelectChange}>
              {categoryList.map((item: ICategory) => {
                return (<Option value={item.id} key={item.id}>{item.name}</Option>)
              })}
            </Select>
          </Form.Item>
          <Form.Item label='描述'>
            <TextArea value={garbage.description} onChange={this.handleDescriptionChange} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  renderBar = () => {
    const { categoryList, page } = this.state
    return (
      <div className="bar">
        <Select value={page.categoryId} onChange={this.handleBarSelectChange} className='right select'>
          {categoryList.map((item: ICategory) => {
            return (<Option value={item.id} key={item.id}>{item.name}</Option>)
          })}
        </Select>
        <Search placeholder="请输入关键词" className='right search-btn' onSearch={async keyword => {
          await this.setState({ page: { ...this.state.page, keyword: keyword } })
          await this.getList()
        }} enterButton />
        <Button icon="reload" className='right' onClick={async () => {
          await this.setState({ page: { ...this.state.page, keyword: '', categoryId: '' } })
          await this.getList()
        }}>刷新</Button>
        <Button type="primary" icon="plus" className='float-right' onClick={() => {
          this.handleResetGarbage()
          this.setState({
            showForm: true,
            formType: 'create',
          })
        }}>添加</Button>
      </div>
    )
  }

  renderTable = () => {
    const { page, list, total, loading } = this.state
    const columns = [
      { title: '名称', dataIndex: 'name', key: 'name', width: 50, ellipsis: true, className: 'center' },
      { title: '类别', dataIndex: 'categoryName', key: 'categoryName', width: 50, ellipsis: true, className: 'center' },
      { title: '描述', dataIndex: 'description', key: 'description', width: 100, className: 'center' },
      {
        title: '修改时间', dataIndex: 'updateTime', key: 'updateTime', width: 50, ellipsis: true, className: 'center',
        render: (value: any) => <span>{parseTime(value, '{y}-{m}-{d} {h}:{s}')}</span>,
      },
      {
        title: '操作', width: 50, ellipsis: true, className: 'center', render: (text: IGarbage, index: number) => (
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
        <div className="container">
          {this.renderBar()}
          {this.renderTable()}
          {this.renderForm()}
        </div>
      </div>
    )
  }
}

export default Garbage