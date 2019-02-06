import React from 'react'
import { Row, Col } from 'reactstrap'
import { NavLink as Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'
import PostsSearchBarContainer from '../containers/PostsSearchBarContainer'
import { categories } from '../common/categories'

const main = { url: '', id: 0, name: 'Главная' }
const links = [ main, ...categories ]

const Header = () => (
  <header>
    <Row className='m-2 p-2'>
      <Col className='justify-content-start align-items-center'>
          <img src='images/placeholder.png' height='40px' alt='Наблюдатель' />
      </Col>
      <Col className='justify-content-center '>
          <p className='h3 m-0 text-center text-monospace'>Наблюдатель</p>
      </Col>
      <Col className='justify-content-end align-items-center'>
          <PostsSearchBarContainer />
      </Col>
    </Row>
    
    <Row className='align-items-center'> 
      <Col>
        <Navbar expand='xs' className='border-bottom border-gray'>
          <Nav className='w-100' fill>
            { links.map( (link) => 
              <NavItem key={link.id}>
                <NavLink className='NavLink d-inline-block p-0 rounded
                text-reset text-decoration-none text-uppercase small' 
                tag={Link} to={'/' + link.url} exact replace>
                  {link.name} 
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Navbar>
      </Col>
    </Row>
  </header>
)

export default Header
