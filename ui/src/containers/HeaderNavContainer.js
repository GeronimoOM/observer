import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderNav from '../components/HeaderNav'
import { fetchCategories } from '../actions/categories'


class HeaderNavContainer extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <HeaderNav categories={this.props.categories} />
    )
  }
}

export default connect(
  (state) => { 
    return {
      categories: state.categories 
    }
  },
  { fetchCategories }
)(HeaderNavContainer)
