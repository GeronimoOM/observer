import { connect } from 'react-redux'
import { fetchPostsByQuery } from '../actions/posts'
import PostsStore from '../data/posts'
import PostsSearchBar from '../components/PostsSearchBar'

const PostsSearchBarContainer = connect(
  (state) => PostsStore(state).getPostsByQuery(),
  { fetchPosts: (query) => fetchPostsByQuery(query) }
)(PostsSearchBar)

export default PostsSearchBarContainer