import React from 'react'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { Post } from '../types'

const MainPosts = ({ posts }) => (
  <div className='d-flex-column'>
    { posts.map((post, i) => 
      <PostCard first={i===0} key={post.id} {...post} />
    )}
  </div>
)

MainPosts.propTypes = {
  posts: PropTypes.arrayOf(Post).isRequired
}

export default MainPosts
