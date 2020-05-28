import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import TextField from '@material-ui/core/TextField'
import { ForumContext } from './ForumContext'
import { baseURL } from '../constants'
import Loader from '../components/Loader'
import axios from 'axios'

const CreatePost = ({ show, handleClose }) => {
	const {
		proceduresState: { sessionData, activeTopic, topics },
		loadPosts,
		setActiveTopic
	} = useContext(ForumContext)

	const [titleValue, setTitleValue] = useState('')
	const [contentValue, setContentValue] = useState('')
	const [topic, setTopic] = useState(null)
	const [loading, setLoading] = useState('')

	const handleSubmit = async () => {
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
	useEffect(() => {
		if (topics)
			setTopic(topics.find((topic) => topic.topic_id === activeTopic).title)
	}, [topics])

	if (!topics || loading) return <Loader />
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Create a new post</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex flex-column">
				<TextField
					id="outlined-basic"
					label="Title"
					className="pb-3"
					variant="outlined"
					value={titleValue}
					onChange={(e) => {
						setTitleValue(e.target.value)
					}}
				/>
				<TextField
					id="outlined-multiline-static"
					label="Multiline"
					multiline
					rows={4}
					className="pb-3"
					defaultValue="Default Value"
					variant="outlined"
					value={contentValue}
					onChange={(e) => {
						setContentValue(e.target.value)
					}}
				/>
				<TextField
					id="standard-select-currency-native"
					select
					label="Native select"
					value={topic}
					onChange={(e) => {
						setTopic(e.target.value)
					}}
					SelectProps={{
						native: true
					}}
					helperText="Please select your currency"
				>
					{topics.map((topic) => (
						<option key={topic.topic_id} value={topic.title}>
							{topic.title}
						</option>
					))}
				</TextField>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="info" onClick={handleSubmit}>
					Publish new post
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

CreatePost.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

export default CreatePost
