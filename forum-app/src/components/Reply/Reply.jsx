import React from 'react'
import PropTypes from 'prop-types'

const Reply = (props) => {
	const {
		date_published: publishDate,
		content,
		author,
		profile_image: profileImg,
		num_of_likes: likes
	} = props
	console.log(props)
	return <div>{(publishDate, content, author, profileImg, likes)}</div>
}

Reply.propTypes = {}

export default Reply
