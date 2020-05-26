import React from 'react'
import PropTypes from 'prop-types'
import DateConverter from '../DateConverter'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ProfileImage from '../ProfileImage'

const Reply = (props) => {
	const {
		date_published: publishDate,
		content,
		author,
		profile_image: profileImg,
		num_of_likes: numOfLikes
	} = props

	const increaseLikes = () => {
		console.log('like')
	}

	return (
		<div className="row">
			<div className="col-1 p-0 pr-1 mt-0 text-center">
				<ProfileImage imgSrc={profileImg} />
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
							<span onClick={increaseLikes}>
								<FavoriteIcon /> {numOfLikes}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

Reply.propTypes = {}

export default Reply
