import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from '../util/formatDate'

const PostCard = ({id, added, title, subtitle, image, first}) => {
  const imgProps = {
    style: first ? {}: { maxWidth: '185px' },
    className: first ? 'w-100 mb-2' : 'float-left mr-3 mb-2'
  }

  return (
    <Link className='text-reset text-decoration-none' to={`/posts/${id}`}>
      <div className='clearfix position-relative pb-4 my-3'>
        { Boolean(image) && 
          <img {...imgProps} src={image} alt={title} /> }
        <p className='mb-1 font-weight-bold'>{title}</p>
        <p className='mb-0 small'>{subtitle}</p>
        <span className='position-absolute small text-muted'
        style={{ bottom: 0, right: 0 }}>{formatDate(added)}</span>
      </div>
    </Link>
  )
}

PostCard.propTypes = {
	added: PropTypes.instanceOf(Date).isRequired,
	title: PropTypes.string.isRequired
}

export default PostCard
