import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import TextField from '@material-ui/core/TextField'
import { ForumContext } from './ForumContext'
import { baseURL } from '../constants'
import Loader from '../components/Loader'
import axios from 'axios'

const CreatePost = ({
	show,
	handleClose,
	isReply,
	parentPostId,
	updateRepliesCallback
}) => {
	const {
		proceduresState: { sessionData, activeTopic, topics },
		loadPosts
	} = useContext(ForumContext)

	const [titleValue, setTitleValue] = useState('')
	const [contentValue, setContentValue] = useState('')
	const [topic, setTopic] = useState(null)
	const [loading, setLoading] = useState('')

	const handleNewPostSubmit = async () => {
		const selectedTopic = topics
			? topics.find((item) => item.title === topic)
			: null
		const body = {
			title: titleValue,
			content: contentValue,
			topic_id: selectedTopic && selectedTopic.topic_id,
			user_id: sessionData.user_id
		}
		try {
			setLoading(true)
			const result = await axios.post(`${baseURL}/posts`, body)
			if (result instanceof Error) throw result
			await loadPosts()
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
			handleClose()
		}
	}

	const handleReplySubmit = async () => {
		const body = {
			content: contentValue,
			user_id: sessionData.user_id,
			parentPostId
		}
		try {
			setLoading(true)
			const result = await axios.post(`${baseURL}/replies`, body)
			if (result instanceof Error) throw result
			await updateRepliesCallback()
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
			handleClose()
		}
	}

	useEffect(() => {
		if (topics)
			setTopic(topics.find((topic) => topic.topic_id === activeTopic).title)
	}, [topics])

	if (!topics || loading) return <Loader />
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{isReply ? 'Write reply' : 'Create a new post'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex flex-column">
				{!isReply && (
					<TextField
						label="Post title"
						className="pb-3"
						variant="outlined"
						value={titleValue}
						onChange={(e) => {
							setTitleValue(e.target.value)
						}}
					/>
				)}
				<TextField
					label={isReply ? 'Reply content' : 'New post content'}
					multiline
					rows={4}
					className="pb-3"
					variant="outlined"
					value={contentValue}
					onChange={(e) => {
						setContentValue(e.target.value)
					}}
				/>
				{!isReply && (
					<TextField
						select
						label="Select topic"
						value={topic}
						onChange={(e) => {
							setTopic(e.target.value)
						}}
						SelectProps={{
							native: true
						}}
						helperText="Please select the topic for the new post"
					>
						{topics.map((topic) => (
							<option key={topic.topic_id} value={topic.title}>
								{topic.title}
							</option>
						))}
					</TextField>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button
					variant="info"
					onClick={isReply ? handleReplySubmit : handleNewPostSubmit}
				>
					{isReply ? 'Post reply' : 'Publish new post'}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

CreatePost.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	parentPostId: PropTypes.number,
	isReply: PropTypes.bool,
	updateRepliesCallback: PropTypes.func
}

export default CreatePost
