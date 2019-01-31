import React from 'react'
import { Route } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import HeaderNavbarContainer from '../containers/HeaderNavbarContainer'
import CategoryPostsContainer from '../containers/CategoryPostsContainer'
import PostsSearchBarContainer from '../containers/PostsSearchBarContainer'
import { categoryIdByUrl } from '../common/categories'
import MainLayout from './MainLayout';

const Logo = () => (<img src="images/placeholder.png" height='40px' alt='Наблюдатель' />)

const AppLayout = () => (
  <Container>
    <Row>
      <Col>
        <Logo className='float-left' />
      </Col>
      <Col>
        <h3 className='text-justify'>Наблюдатель</h3>
      </Col>
      <Col>
        <PostsSearchBarContainer />
      </Col>
    </Row>
    <hr/> 
    <Row> 
      <Col>
        <HeaderNavbarContainer/>
      </Col>
    </Row>
    <div>
      <Route path='/' exact component={ MainLayout } />
      <Route path='/:category' render={({ match: { params: { category } } }) => (
        <CategoryPostsContainer category={ categoryIdByUrl(category) } />
      )}/>
    </div>
    <div>
      diagry ©2018
    </div>
  </Container>
)

export default AppLayout
