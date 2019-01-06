import { connect } from 'react-redux'
import { fetchPostsByQuery } from '../actions/posts'
import PostsStore from '../data/posts'
import PostsSearchBar from '../components/PostsSearchBar'

// TODO Similar to MainPostsContainer
const PostsSearchBarContainer = connect(
  (state) => /** Posts by query in state tree, use PostsStore.  */,
  { fetchPosts: /** Function to fetch posts by query */ }
)(PostsSearchBar)

export default PostsSearchBarContainer