import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap'
import { ForumContext } from '../ForumContext'
import Loader from '../../components/Loader'
import './TopicsBar.scss'

const TopicsBar = () => {
	const {
		proceduresState: { topics, activeTopic },
		setActiveTopic
	} = useContext(ForumContext)
	if (!topics) return <Loader />
	return (
		<Nav
			as="ul"
			fill
			variant="tabs"
			activeKey={activeTopic}
			className="topics-bar"
		>
			{topics.map(({ topic_id: topicId, title }) => (
				<Nav.Item as="li" key={topicId} className="h6">
					<Nav.Link eventKey={topicId} onSelect={() => setActiveTopic(topicId)}>
						{title}
					</Nav.Link>
				</Nav.Item>
			))}
		</Nav>
	)
}
export default TopicsBar
