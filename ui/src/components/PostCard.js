import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg } from 'reactstrap'
import { Link } from 'react-router-dom'
import formatDate from '../util/formatDate'

const PostCard = ({id, added, title, subtitle, content, image}) => (
	<Link className='text-reset text-decoration-none' to={'/posts/' + id}>
		<Card className='PostCard'>
			{Boolean(image) && <CardImg top src={image} alt={title} />}
			<CardBody>
				<CardTitle>{title}</CardTitle>
				<CardSubtitle>{subtitle}</CardSubtitle>
				<p>{formatDate(added)}</p>
				{/* <CardText dangerouslySetInnerHTML={{ __html: content }} /> */}
			</CardBody>
		</Card>
	</Link>
)

PostCard.propTypes = {
	added: PropTypes.instanceOf(Date).isRequired,
	title: PropTypes.string.isRequired
}

export default PostCard
