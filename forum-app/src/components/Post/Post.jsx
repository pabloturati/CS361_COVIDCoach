import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import Reply from '../Reply/Reply'
import { baseURL } from '../../constants'
import Loader from '../Loader'

const Post = ({
	author,
	post_title: title,
	date_published: publishDate,
	num_of_likes,
	content,
	post_id: postId
}) => {
	const [replies, setReplies] = useState(null)
	const getReplies = async () => {
		try {
			const response = await axios.get(`${baseURL}/replies?postId=${postId}`)
			setReplies(response.data)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		getReplies()
	}, [])

	if (!replies) return <Loader />
	return (
		<Card>
			<Card.Header>{title}</Card.Header>
			<Card.Body>
				<p>{content}</p>
				<footer className="blockquote-footer">
					<cite title="Source Title">{}</cite>
				</footer>
			</Card.Body>
			<Card.Footer className="text-muted">
				by {author} @ {publishDate} Likes: {num_of_likes}
			</Card.Footer>
			{replies.map((reply) => (
				<Reply key={reply.response_id} {...reply} />
			))}
		</Card>
	)
}

Post.propTypes = {
	author: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	date_published: PropTypes.string.isRequired
	// num_of_likes: PropTypes.number
}

export default Post
