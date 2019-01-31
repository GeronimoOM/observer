import React from 'react'
import PropTypes from 'prop-types'
import { Post } from '../types'

const PostLayout = ({ title, subtitle, added, content }) => (
  <div>
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
    <p dangerouslySetInnerHTML={{ __html: content }}></p>
  </div>
)

PostLayout.propTypes = PropTypes.shape(Post)

export default PostLayout
