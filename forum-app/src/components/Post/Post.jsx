import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import Reply from '../Reply/Reply'
import { baseURL } from '../../constants'
import Loader from '../Loader'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DateConverter from '../DateConverter'

const Post = ({
	author,
	post_title: title,
	date_published: publishDate,
	num_of_likes,
	content,
	post_id: postId,
	profile_image: profileImg
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
	const increaseLikes = () => {
		console.log('like')
	}

	useEffect(() => {
		getReplies()
	}, [])

	if (!replies) return <Loader />
	return (
		<div className="row m-0">
			<div className="col-1 p-0 pr-1 mt-3">
				<img className="img-fluid rounded-lg" src={profileImg} alt="Profile" />
			</div>
			<div className="col-11 my-3">
				<div className="row">
					<div
						className="col-12 rounded mb-1 p-1 "
						style={{ backgroundColor: '#dbf4ff' }}
					>
						<h4 className="h5">{title}</h4>
						<p className="m-0 mb-1 px-1" style={{ fontSize: '0.9rem' }}>
							{content}
						</p>
						<div
							className="text-muted m-0 d-flex justify-content-between"
							style={{ fontSize: '0.8rem' }}
						>
							<span>
								by {author}. Posted <DateConverter date={publishDate} />
							</span>
							<span onClick={increaseLikes}>
								<FavoriteIcon /> {num_of_likes}
							</span>
						</div>
					</div>
				</div>
				<div>
					{replies.map((reply) => (
						<Reply key={reply.response_id} {...reply} />
					))}
				</div>
			</div>
		</div>
	)
}

Post.propTypes = {
	author: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	date_published: PropTypes.string.isRequired
	// num_of_likes: PropTypes.number
}

export default Post
