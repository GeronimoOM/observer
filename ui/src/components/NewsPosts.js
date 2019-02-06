import React from 'react'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { Post } from '../types'

const NewsPosts = ({ posts, fetchPosts, fetching, hasMore }) => (
  <div className='d-flex-column'>
    { posts.map((post, i) => 
      <PostCard first={i===0} key={post.id} {...post} />
    )}
  </div>
)

NewsPosts.propTypes = {
  posts: PropTypes.arrayOf(Post).isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired
}

export default NewsPosts
