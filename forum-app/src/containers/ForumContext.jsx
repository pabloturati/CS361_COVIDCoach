import React, { createContext } from 'react'

export const ForumContext = createContext()

export const ForumContextProvider = (props) => {
	const { children, ...rest } = props
	return (
		<ForumContext.Provider value={{ ...rest }}>
			{children}
		</ForumContext.Provider>
	)
}
