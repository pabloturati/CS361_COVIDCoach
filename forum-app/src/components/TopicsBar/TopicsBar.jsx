import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../../constants'
import { Nav } from 'react-bootstrap'

const TopicsBar = (props) => {
	const [topics, setTopics] = useState(null)

	useEffect(() => {
		async function fetchTopics() {
			try {
				const response = await axios.get(`${baseURL}/topics`)
				setTopics(response.data)
			} catch (e) {
				console.error(e.message || e)
			}
		}
		fetchTopics()
	}, [])
	if (!topics) return null
	return (
		<Nav fill variant="tabs" defaultActiveKey="">
			{topics.map(({ topic_id: topicId, title }) => (
				<Nav.Item key={topicId}>
					<Nav.Link eventKey="">{title}</Nav.Link>
				</Nav.Item>
			))}
		</Nav>
	)
}

export default TopicsBar
