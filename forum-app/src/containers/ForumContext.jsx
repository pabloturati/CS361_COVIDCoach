import React, { createContext } from 'react'

export const forumContext = createContext()

export const ForumContext = (props) => {
	const { children, ...rest } = props
	return <Context.Provider value={{ ...rest }}>{children}</Context.Provider>
}
