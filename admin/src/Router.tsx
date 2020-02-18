import React, { Component } from 'react'
import { BrowserRouter, Switch, Link, Route, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import Home from './views/Home/Home'
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
    path: '/home',
    component: Home,
    meta: { title: '首页', icon: 'home' }
  },
  {
    path: '/category',
    component: Category,
    meta: { title: '分类', icon: 'appstore' }
  },
  {
    path: '/garbage',
    component: Garbage,
    meta: { title: '垃圾', icon: 'delete' }
  }
]

const RenderSider = withRouter(({ history }) => {
  return (
    <Sider theme='light' className='sider'>
      <Menu mode="inline" defaultSelectedKeys={['/home']} selectedKeys={[history.location.pathname]} className='menu'>
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
            <Content className='content'>
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
