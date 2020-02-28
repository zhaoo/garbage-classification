import React, { Component } from 'react'
import { BrowserRouter, Switch, Link, Route, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import Dashboard from './views/Dashboard/Dashboard'
import Category from './views/Category/Category'
import Garbage from './views/Garbage/Garbage'

const { Sider, Content } = Layout

interface RouterInterface {
  path: string,
  component: any,
  meta: {
    title: string,
    icon: string
  }
}

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { title: '仪表盘', icon: 'dashboard' }
  },
  {
    path: '/category',
    component: Category,
    meta: { title: '分类管理', icon: 'appstore' }
  },
  {
    path: '/garbage',
    component: Garbage,
    meta: { title: '垃圾管理', icon: 'delete' }
  }
]

const RenderSider = withRouter(({ history }) => {
  return (
    <Sider theme='light' className='sider'>
      <Menu mode="inline" defaultSelectedKeys={['/dashboard']} selectedKeys={[history.location.pathname]} className='menu'>
        {routes.map((route) => {
          return (
            <Menu.Item key={route.path}>
              <Link to={route.path}>
                <Icon type={route.meta.icon} />
                {route.meta.title}
              </Link>
            </Menu.Item>
          )
        })}
      </Menu>
    </Sider>
  )
})

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout className='container'>
            <RenderSider />
            <Content className='main'>
              <Switch>
                {routes.map((route: RouterInterface) => {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      render={() => (
                        <route.component />
                      )}
                    />
                  )
                })}
              </Switch>
            </Content>
          </Layout>
        </div>
      </BrowserRouter>
    )
  }
}
