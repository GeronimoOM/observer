import { connect } from 'react-redux'
import { PostFlags } from '../common/posts'
import { fetchPostsByFlag } from '../actions/posts'
import PostsStore from '../data/posts'
import PostsScroll from '../components/PostsScroll'

const MainPostsContainer = connect(
  (state) => PostsStore(state).getPostsByFlag(PostFlags.Main),
  { fetchPosts: (page) => fetchPostsByFlag(PostFlags.Main, page) }
)(PostsScroll)

export default MainPostsContainer