import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'
import { ForumContext } from '../ForumContext'
import Loader from '../../components/Loader'

const TopicsBar = () => {
	const {
		proceduresState: { topics, activeTopic },
		setActiveTopic
	} = useContext(ForumContext)
	if (!topics) return <Loader />
	return (
		<Nav fill variant="tabs" activeKey={activeTopic}>
			{topics.map(({ topic_id: topicId, title }) => (
				<Nav.Item key={topicId}>
					<Nav.Link eventKey={topicId} onSelect={() => setActiveTopic(topicId)}>
						{title}
					</Nav.Link>
				</Nav.Item>
			))}
		</Nav>
	)
}
export default TopicsBar
