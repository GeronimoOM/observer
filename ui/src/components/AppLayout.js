import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import { categoryIdByUrl } from '../common/categories'
import MainLayout from './MainLayout'
import Header from './Header'
import CategoryPostsContainer from '../containers/CategoryPostsContainer'
import PostLayoutContainer from '../containers/PostLayoutContainer'

const AppLayout = () => (
    <Container>
      <Header/>
      
      <Switch>
        <Route path='/' exact component={MainLayout} />
        <Route path='/posts/:id' render={({ match: { params: { id }}}) => (
          <PostLayoutContainer id={id} />
        )}/>
        <Route path='/:category' render={({ match: { params: { category }}}) => (
          <CategoryPostsContainer category={categoryIdByUrl(category)} />
        )}/>
      </Switch>
    </Container>
)

export default AppLayout
