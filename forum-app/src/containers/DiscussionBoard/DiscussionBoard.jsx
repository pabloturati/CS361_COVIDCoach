import React, { useContext } from 'react'
import Post from '../Post/Post'
import { ForumContext } from '../ForumContext'
import Loader from '../../components/Loader'

const DiscussionBoard = () => {
	const {
		proceduresState: { posts }
	} = useContext(ForumContext)
	if (!posts) return <Loader />
	return (
		<div className="container-lg mt-3">
			{posts.map((post) => (
				<Post key={post.post_id} {...post} />
			))}
		</div>
	)
}

export default DiscussionBoard
