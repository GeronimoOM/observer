import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'
import PropTypes from 'prop-types'
import { Category } from '../types'

const HeaderNavbar = ({ categories }) => {
  const main = { url: '', id: 0, name: 'Главная' }
  const links = [main, ...categories]
  console.log(links)

  return (
    <Navbar className='justify-content-center' expand={'md'}>
      <Nav className='Nav'>
        { links.map( (link) => 
          <NavItem key={link.id}>
            <NavLink className='NavLink' tag={Link} to={'/' + link.url} 
              exact replace>
              {link.name} 
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  )
}

HeaderNavbar.propTypes = {
  categories: PropTypes.arrayOf(Category).isRequired
}

export default HeaderNavbar
