import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import PropTypes from 'prop-types';
import { Category } from '../types'


const HeaderNav = ({ categories }) => (
  <Menu
    mode='horizontal'>
      <Menu.Item key={categories.length}>
      <NavLink to='/'>
        Главная
      </NavLink>
    </Menu.Item>
    { categories.map( (category) => 
      <Menu.Item key={category.id}>
        <NavLink to={category.url}>
          {category.name} 
        </NavLink>
      </Menu.Item>
    )}
  </Menu>
)

HeaderNav.propTypes = {
  categories: PropTypes.arrayOf(Category).isRequired
}

export default HeaderNav
