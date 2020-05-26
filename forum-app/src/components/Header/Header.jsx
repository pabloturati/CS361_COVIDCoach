import React, { useState } from 'react'
import './Header.scss'
import { Nav } from 'react-bootstrap'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import LoginForm from '../LoginForm'
import axios from 'axios'
import { baseURL } from '../../constants'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'

const PAGE_ROUTES = {
	news: { route: '/index', label: 'News' },
	safety: { route: '/safety', label: 'Safety' },
	forum: { route: '/forum', label: 'Forum' }
}
const { news, safety, forum } = PAGE_ROUTES

const Header = () => {
	const [loginLink, setLoginLink] = useState(null)

	const requestLoginLink = async () => {
		try {
			const linkRequest = await axios.get(`${baseURL}/login`)
			if (linkRequest instanceof Error) throw linkRequest
			setLoginLink(linkRequest.data)
		} catch (err) {
			console.error(err)
		}
	}
	useEffect(() => {
		requestLoginLink()
	}, [])

	return (
		<header className="">
			<div className="d-flex align-items-center justify-content-between">
				<h1 className="site-title">CovidCoach Forum</h1>
				<div className="d-flex mx-3">
					<Avatar className="mx-2" alt={'author'} src={''} />
					{loginLink ? (
						<a href={loginLink}>
							<Button variant="contained">Login</Button>
						</a>
					) : (
						<div className="d-flex align-items-center">
							<Spinner animation="border" role="status" variant="secondary">
								<span className="sr-only">Loading...</span>
							</Spinner>
						</div>
					)}
				</div>
			</div>
			<Nav as="ul">
				<Nav.Item as="li">
					<Nav.Link href={news.route}>{news.label}</Nav.Link>
				</Nav.Item>
				<Nav.Item as="li">
					<Nav.Link href={safety.route}>{safety.label}</Nav.Link>
				</Nav.Item>
				<Nav.Item as="li">
					<Nav.Link disabled href={forum.route}>
						{forum.label}
					</Nav.Link>
				</Nav.Item>
			</Nav>
		</header>
	)
}

export default Header
