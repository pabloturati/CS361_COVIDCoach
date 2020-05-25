import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import Reply from '../Reply/Reply'

const Post = ({ post = {} }) => {
	const {
		title,
		user_id, // Get user name and title
		date_published,
		num_of_likes,
		content
	} = post

	return (
		<Card>
			<Card.Header>{title}</Card.Header>
			<Card.Body>
				<p>{content}</p>
				<footer className="blockquote-footer">
					<cite title="Source Title">{}</cite>
				</footer>
			</Card.Body>
			<Card.Footer className="text-muted">2 days ago</Card.Footer>
			{/* Replies */}
		</Card>
	)
}

Post.propTypes = {}

export default Post
