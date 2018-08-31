import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import HeaderNavContainer from '../containers/HeaderNavContainer'
import PostsListContainer from '../containers/PostsListContainer'

const { Header, Content, Footer } = Layout


const MainLayout = () => (
  <Layout className='layout'>
    <Header>
      <HeaderNavContainer/>
    </Header>
    <Content>
      <Route path='/:category?' render={({ match: { params: { category } } }) => (
        <PostsListContainer category={ category } />
      )}/>
    </Content>
    <Footer>
      diagry ©2018
    </Footer>
  </Layout>
)

export default MainLayout
