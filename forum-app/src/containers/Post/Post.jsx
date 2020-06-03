import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { ForumContext } from '../ForumContext'
import Reply from '../../components/Reply'
import { baseURL } from '../../constants'
import Loader from '../../components/Loader'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DateConverter from '../../components/DateConverter'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CreatePost from '../CreatePost'
import './Post.scss'

const Post = ({
	author,
	post_title: title,
	date_published: publishDate,
	num_of_likes: numOfLikes,
	content,
	post_id: postId,
	profile_image: profileImg
}) => {
	const {
		proceduresState: { sessionData },
		loadPosts
	} = useContext(ForumContext)

	const [replies, setReplies] = useState(null)
	const [showReplyModal, setShowReplyModal] = useState(false)
	const [likeLoading, setLikeLoading] = useState(false)
	const getReplies = async () => {
		try {
			const response = await axios.get(`${baseURL}/replies?postId=${postId}`)
			setReplies(response.data)
		} catch (e) {
			console.error(e)
		}
	}
	const increaseLikes = async () => {
		try {
			setLikeLoading(true)
			const increaseLikeResult = await axios.post(`${baseURL}/posts/like`, {
				postId,
				userId: sessionData.user_id
			})
			if (increaseLikeResult instanceof Error) throw increaseLikeResult
			loadPosts()
		} catch (error) {
			console.error(error)
		} finally {
			setLikeLoading(false)
		}
	}
	const requestUserToLogin = () => {
		window.alert('Please login to post or like')
	}

	useEffect(() => {
		getReplies()
	}, [])

	if (!replies) return <Loader />
	return (
		<div className="row m-0">
			<div className="col-1 p-0 mt-3">
				<Avatar alt={author} src={profileImg} />
			</div>
			<div className="col-11 my-1">
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
							className="text-muted m-0 d-flex justify-content-between align-items-end mb-1"
							style={{ fontSize: '0.8rem' }}
						>
							<span className="link">
								by {author}. Posted <DateConverter date={publishDate} />
							</span>
							<div>
								{!likeLoading && (
									<span
										onClick={sessionData ? increaseLikes : requestUserToLogin}
										className="mr-2 favorite-box"
									>
										<FavoriteIcon /> <span>{numOfLikes}</span>
									</span>
								)}
								{likeLoading && (
									<div
										className="spinner-grow spinner-grow-sm text-secondary mr-2"
										role="status"
									>
										<span className="sr-only">Loading...</span>
									</div>
								)}
								{sessionData && (
									<Button
										variant="outlined"
										color="primary"
										disabled={!sessionData}
										onClick={() => setShowReplyModal(true)}
									>
										Reply
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
				{replies.map((reply) => (
					<Reply
						key={reply.response_id}
						{...reply}
						sessionData={sessionData}
						requestUserToLogin={requestUserToLogin}
						updateRepliesCallback={getReplies}
					/>
				))}
			</div>
			<CreatePost
				isReply
				show={showReplyModal}
				handleClose={() => setShowReplyModal(false)}
				parentPostId={postId}
				updateRepliesCallback={getReplies}
			/>
		</div>
	)
}

Post.propTypes = {
	author: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	date_published: PropTypes.string.isRequired,
	num_of_likes: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
	profile_image: PropTypes.string
}
Post.defaultProps = {
	profile_image: null
}

export default Post
