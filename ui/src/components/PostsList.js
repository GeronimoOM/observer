import React from 'react'
import PropTypes from 'prop-types'
import PostCard from './PostCard'
import { Post } from '../types'

const PostsList = ({ posts }) => (
  <div>
    { posts.map( (post) => 
      <PostCard key={ post.id } { ...post } /> )}
  </div>  
)

PostsList.propTypes = {
  posts: PropTypes.arrayOf(Post).isRequired
}

export default PostsList
