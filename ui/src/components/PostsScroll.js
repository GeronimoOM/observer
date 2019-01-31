import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import PropTypes from 'prop-types'
import { Post } from '../types'
import PostsList from '../components/PostsList'

const PostsScroll = ({ posts, fetchPosts, fetching, hasMore }) => (
  <InfiniteScroll
  loadMore={ fetchPosts }
  hasMore={ !fetching && hasMore }
  loader={ <p key={0}>Загрузка...</p> }>
    <PostsList posts={ posts } />
  </InfiniteScroll>
)

PostsScroll.propTypes = {
  posts: PropTypes.arrayOf(Post).isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired
}

export default PostsScroll