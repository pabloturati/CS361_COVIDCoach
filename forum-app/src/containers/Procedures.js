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
