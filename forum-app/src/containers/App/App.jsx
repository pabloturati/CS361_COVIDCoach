import React from 'react'
import './App.scss'
import { ForumContextProvider } from '../ForumContext'
import { ForumProcedures } from '../ForumProcedures'
import Header from '../../components/Header/Header'
import TopicsBar from '../TopicsBar/TopicsBar'
import DiscussionBoard from '../DiscussionBoard/DiscussionBoard'

const App = () => {
	const proceduresAndContext = ForumProcedures()
	return (
		<ForumContextProvider {...proceduresAndContext}>
			<Header />
			<TopicsBar />
			<DiscussionBoard />
		</ForumContextProvider>
	)
}

export default App
