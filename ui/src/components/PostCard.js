import React from 'react'
import formatDate from '../util/formatDate'
import PropTypes from 'prop-types'

const PostCard = ({ added, title, subtitle, content }) => (
  <div className='PostCard'>
    <p>{ formatDate(added) }</p>
	  <h3>{ title }</h3>
		<h4>{ subtitle }</h4>
		<div dangerouslySetInnerHTML={{ __html: content }} />
	</div>
)

PostCard.propTypes = {
	added: PropTypes.instanceOf(Date).isRequired,
	title: PropTypes.string.isRequired
}

export default PostCard
