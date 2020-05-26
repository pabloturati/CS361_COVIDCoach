import React from 'react'
import PropTypes from 'prop-types'

const ProfileImage = ({ imgSrc }) => {
	return (
		<img
			className="img-fluid rounded-lg"
			src={imgSrc}
			alt="Profile"
			style={{ maxHeight: '50px' }}
		/>
	)
}

ProfileImage.propTypes = {
	imgSrc: PropTypes.string.isRequired
}

export default ProfileImage
