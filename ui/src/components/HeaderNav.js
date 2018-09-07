import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Category } from '../types'

const HeaderNav = ({ categories }) => (
  <Navbar>
    <Nav>
      <NavLinkItem to='/' key={categories.length}>
        Главная
      </NavLinkItem>
      { categories.map( (category) => 
        <NavLinkItem to={category.url} key={category.id}>
          {category.name} 
        </NavLinkItem>
      )}
    </Nav>
  </Navbar>
)

const NavLinkItem = (props) => (
  <NavItem componentClass={NavLink} href={props.to} { ...props } >
    {props.children}
  </NavItem>
)

HeaderNav.propTypes = {
  categories: PropTypes.arrayOf(Category).isRequired
}

export default HeaderNav
