import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DateConverter from './DateConverter'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'
import { baseURL } from '../constants'

const Reply = ({
	date_published: publishDate,
	content,
	author,
	profile_image: profileImg,
	num_of_likes: numOfLikes,
	sessionData,
	requestUserToLogin,
	updateRepliesCallback,
	response_id: responseId
}) => {
	const [likeLoading, setLikeLoading] = useState(false)
	const increaseLikes = async () => {
		try {
			setLikeLoading(true)
			const increaseLikeResult = await axios.post(`${baseURL}/replies/like`, {
				replyId: responseId,
				userId: sessionData.user_id
			})
			if (increaseLikeResult instanceof Error) throw increaseLikeResult
			updateRepliesCallback()
		} catch (error) {
			console.error(error)
		} finally {
			setLikeLoading(false)
		}
	}

	return (
		<div className="row">
			<div className="col-1 p-0 pr-1 mt-0 text-center">
				<Avatar alt={author} src={profileImg} />
			</div>
			<div className="col-11">
				<div className="row">
					<div
						className="col-12 rounded mb-1 p-1 "
						style={{ backgroundColor: '#dbffe5' }}
					>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

Reply.propTypes = {
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	date_published: PropTypes.string.isRequired,
	num_of_likes: PropTypes.number.isRequired,
	profile_image: PropTypes.string,
	sessionData: PropTypes.objectOf(PropTypes.any),
	requestUserToLogin: PropTypes.func.isRequired,
	updateRepliesCallback: PropTypes.func.isRequired
}
Reply.defaultProps = {
	profile_image: null
}

export default Reply
