import { useReducer, useEffect } from 'react'
import { baseURL } from '../constants'
import produce from 'immer'
import axios from 'axios'

const LOADING = 'LOADING'
const ERROR = 'ERROR'
const LOADED = 'Loaded'
const REFRESH = 'REFRESH'
const SET_TOPIC = 'SET_TOPIC'

export const DATA_KEYS = {
	topics: 'topics',
	activeTopic: 'activeTopic',
	posts: 'posts',
	sessionData: 'sessionData',
	topicList: 'topicList'
}

const initialState = {
	loading: true,
	error: null,
	refreshCount: 0,
	activeTopic: 1,
	posts: null,
	sessionData: null
}

const reducer = produce((draft, action) => {
	/* eslint-disable default-case */
	switch (action.type) {
		case LOADING:
			draft.loading = action.payload
			break
		case ERROR:
			draft.error = action.payload
			break
		case REFRESH:
			draft.refreshCount += 1
			break
		case LOADED:
			draft[action.name] = action.value
			break
		case SET_TOPIC:
			draft.activeTopic = action.payload
			break
	}
	/* eslint-enable default-case */
})

export function ForumProcedures() {
	const [proceduresState, dispatch] = useReducer(reducer, initialState)
	const setLoading = (payload) => dispatch({ type: LOADING, payload })
	const setError = (payload) => dispatch({ type: ERROR, payload })
	const setLoaded = (payload) => dispatch({ type: LOADED, ...payload })
	const setActiveTopic = (payload) => dispatch({ type: SET_TOPIC, payload })

	async function loadTopics() {
		try {
			const response = await axios.get(`${baseURL}/topics`)
			setLoaded({ name: DATA_KEYS.topics, value: response.data })
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}
	async function loadPosts() {
		try {
			const response = await axios.get(
				`${baseURL}/posts?topicId=${proceduresState.activeTopic}`
			)
			setLoaded({ name: DATA_KEYS.posts, value: response.data })
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadTopics()
	}, [])

	useEffect(() => {
		loadPosts()
	}, [proceduresState.activeTopic])

	return {
		proceduresState,
		setLoading,
		setError,
		setLoaded,
		setActiveTopic,
		loadPosts
	}
}
