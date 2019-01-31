import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap'
import formatDate from '../util/formatDate'

const PostCard = ({ added, title, subtitle, content }) => (
  <Card className='PostCard'>
	 	<CardBody>
			<CardTitle>{ title }</CardTitle>
			<CardSubtitle>{ subtitle }</CardSubtitle>
			<p>{ formatDate(added) }</p>
			<CardText dangerouslySetInnerHTML={{ __html: content }} />
		</CardBody>
	</Card>
)

PostCard.propTypes = {
	added: PropTypes.instanceOf(Date).isRequired,
	title: PropTypes.string.isRequired
}

export default PostCard
