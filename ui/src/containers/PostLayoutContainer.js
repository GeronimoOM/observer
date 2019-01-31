import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostsStore from '../data/posts'
import PostLayout from '../components/PostLayout'

const PostLayoutContainer = connect(
  (state, { id }) => PostsStore(state).getPostById(id),
)(PostLayout)

PostLayoutContainer.propTypes = {
  id: PropTypes.number.isRequired
}

export default PostLayoutContainer