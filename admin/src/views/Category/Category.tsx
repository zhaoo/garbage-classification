import React, { Component } from 'react'
import { Card, Row, Col, Modal, Form, Input, notification, Upload, message } from 'antd'
import { category, createCategory, updateCategory } from '../../api/gql'
import graphql from '../../api/graphql'
import './Category.scss'

const { Meta } = Card
const { TextArea } = Input

interface ICategory {
  name: string,
  id: string,
  image: string,
  description: string,
  tips: Array<string>,
}

interface IState {
  list: Array<ICategory>,
  category: ICategory,
  showForm: boolean,
  formType: string
}

class Category extends Component<{}, IState> {
  state = {
    list: [],
    category: {
      name: '',
      id: '',
      image: '',
      description: '',
      tips: []
    },
    showForm: false,
    formType: 'create'
  }

  async componentDidMount() {
    await this.getList()
  }

  getList = async () => {
    const res: any = await graphql.query({ query: category })
    this.setState({ list: res.data.category })
  }

  beforeUpload= (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleNameChange = (event: any) => {
    this.setState({ category: { ...this.state.category, name: event.target.value } })
  }

  handleDescriptionChange = (event: any) => {
    this.setState({ category: { ...this.state.category, description: event.target.value } })
  }

  handleSubmit = async () => {
    const { category, formType } = this.state
    if (formType === 'create') {
      await graphql.mutate({ mutation: createCategory, variables: category })
    }
    if (formType === 'edit') {
      await graphql.mutate({ mutation: updateCategory, variables: category })
    }
    notification['success']({
      message: '提交成功'
    })
    this.setState({ showForm: false })
  }

  handleResetCategory = () => {
    this.setState({
      category: {
        id: '',
        name: '',
        image: '',
        description: '',
        tips: []
      }
    })
  }

  renderForm = () => {
    const { category, showForm } = this.state
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
            <Input value={category.name} onChange={this.handleNameChange} />
          </Form.Item>
          <Form.Item label='描述'>
            <TextArea value={category.description} onChange={this.handleDescriptionChange} />
          </Form.Item>
          <Form.Item label='图片'>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={this.beforeUpload}
            >
              {category.image && <img src={category.image} alt={category.name} style={{ width: '100%' }} /> }
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  renderCard = () => {
    const { list } = this.state
    return (
      <div className='card'>
        <Row>
          {list.map((item: ICategory) => {
            return (
              <Col lg={6} md={12} key={item.id}>
                <Card
                  onClick={() => {
                    this.setState({ showForm: true, category: item, formType: 'edit' })
                  }}
                  hoverable
                  className='item'
                  cover={<img alt={item.name} src={item.image} className='image' />}
                >
                  <Meta title={item.name} description={item.description} />
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }

  render() {
    return (
      <div className='category'>
        {this.renderCard()}
        {this.renderForm()}
      </div>
    )
  }
}

export default Category