import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchPostsByCategory } from '../actions/posts'
import PostsStore from '../data/posts'
import PostsScroll from '../components/PostsScroll'

const CategoryPostsContainer = connect(
  (state, { category }) => PostsStore(state).getPostsByCategory(category),
  (dispatch, { category }) => ({ 
    fetchPosts: bindActionCreators((page) => fetchPostsByCategory(category, page), dispatch) 
  })
)(PostsScroll)

CategoryPostsContainer.propTypes = {
  category: PropTypes.number.isRequired
}

export default CategoryPostsContainer