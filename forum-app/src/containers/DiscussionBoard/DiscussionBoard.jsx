import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Post from '../../components/Post/Post'
import { ForumContext } from '../ForumContext'
import Loader from '../../components/Loader'

const DiscussionBoard = () => {
	const {
		proceduresState: { posts }
	} = useContext(ForumContext)
	if (!posts) return <Loader />
	return (
		<div className="container">
			{posts.map((post) => (
				<div className="row">
					<Post key={post.post_id} {...post} />
				</div>
			))}
		</div>
	)
}

export default DiscussionBoard
