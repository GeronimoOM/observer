import { connect } from 'react-redux'
import { PostTypes } from '../common/posts'
import { fetchPostsByType } from '../actions/posts'
import PostsStore from '../data/posts'
import PostsScroll from '../components/PostsScroll'

const NewsPostsContainer = connect(
  (state) => PostsStore(state).getPostsByType(PostTypes.News),
  { fetchPosts: (page) => fetchPostsByType(PostTypes.News, page) }
)(PostsScroll)

export default NewsPostsContainer