import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import HeaderNavbarContainer from '../containers/HeaderNavbarContainer'
import CategoryPostsContainer from '../containers/CategoryPostsContainer'
import PostsSearchBarContainer from '../containers/PostsSearchBarContainer'
import PostLayoutContainer from '../containers/PostLayoutContainer'
import { categoryIdByUrl } from '../common/categories'
import MainLayout from './MainLayout';

const Header = () => (
  <Fragment>
    <Row>
      <Col><img className='float-left' src="images/placeholder.png" height='40px' alt='Наблюдатель' /></Col>
      <Col><h3 className='text-justify'>Наблюдатель</h3></Col>
      <Col><PostsSearchBarContainer /></Col>
    </Row>
    <hr/> 
    <Row> 
      <Col>
        <HeaderNavbarContainer/>
      </Col>
    </Row>
  </Fragment>
)

const Footer = () => (
  <Row>
    <Col className='align-center'>
      <p>diagry ©2018</p>
    </Col>
  </Row>
)

const AppLayout = () => (
  <Container>
    <Header/>
    
    <Row>
      <Switch>
        <Route path='/' exact component={ MainLayout } />
        <Route path='/posts/:id' render={({ match: { params: { id }}}) => (
          <PostLayoutContainer id={ Number.parseInt(id) } />
        )}/>
        <Route path='/:category' render={({ match: { params: { category }}}) => (
          <CategoryPostsContainer category={ categoryIdByUrl(category) } />
        )}/>
      </Switch>
    </Row>

    <Footer/>
  </Container>
)

export default AppLayout
