import React from 'react'
import './App.scss'
import ForumContext from '../ForumContext'
import Header from '../../components/Header/Header'
import TopicsBar from '../../components/TopicsBar/TopicsBar'
import DiscussionBoard from '../DiscussionBoard/DiscussionBoard'

const App = () => {
	return (
		<ForumContext>
			<Header />
			<TopicsBar />
			<DiscussionBoard />
		</ForumContext>
	)
}

export default App
