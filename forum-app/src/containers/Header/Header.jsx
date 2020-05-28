import React, { useState, useContext } from 'react'
import './Header.scss'
import { Nav } from 'react-bootstrap'
import Avatar from '@material-ui/core/Avatar'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { baseURL } from '../../constants'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import GoogleLogin from 'react-google-login'
import { ForumContext } from '../ForumContext'
import { DATA_KEYS } from '../ForumProcedures'
import CreatePost from '../CreatePost'
import { clientId } from '../../constants'

const PAGE_ROUTES = {
	news: { route: '/index', label: 'News' },
	safety: { route: '/safety', label: 'Safety' },
	forum: { route: '/forum', label: 'Forum' }
}
const { news, safety, forum } = PAGE_ROUTES

const Header = () => {
	const [loginLink, setLoginLink] = useState(null)
	const [showCreatePost, setShowCreatePost] = useState(false)

	const {
		setLoaded,
		proceduresState: { sessionData }
	} = useContext(ForumContext)

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

	const responseGoogle = async (res) => {
		const headers = {
			authorization: 'Bearer',
			'Content-Type': 'application/json'
		}
		try {
			const response = await axios.post(
				`${baseURL}/authorize-user`,
				{ tokenId: res.tokenId },
				headers
			)
			setLoaded({ name: DATA_KEYS.sessionData, value: response.data })
		} catch (e) {
			console.error(e)
		}
	}

	const { first_name: firstName, last_name: lastName, profile_image: picture } =
		sessionData || {}
	const modalProps = {
		show: showCreatePost,
		handleClose: () => setShowCreatePost(false)
	}

	return (
		<header>
			<div className="d-flex align-items-center justify-content-between">
				<h1 className="site-title">CovidCoach Forum</h1>
				<div className="d-flex align-items-center mx-3">
					{sessionData && (
						<h5 style={{ color: '#FFF' }}>{`${firstName} ${lastName}`}</h5>
					)}
					<Avatar
						className="mx-2"
						alt={'author'}
						src={sessionData ? picture : ''}
					/>
					{!sessionData && loginLink && (
						<GoogleLogin
							// clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
							clientId={clientId}
							buttonText="Login"
							onSuccess={responseGoogle}
							onFailure={() => {}}
							cookiePolicy={'single_host_origin'}
						/>
					)}
					{!sessionData && !loginLink && (
						<div className="d-flex align-items-center">
							<Spinner animation="border" role="status" variant="secondary">
								<span className="sr-only">Loading...</span>
							</Spinner>
						</div>
					)}
					{sessionData && (
						<Button
							variant="info"
							onClick={() => {
								setShowCreatePost(true)
							}}
						>
							Create New post
						</Button>
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
			<CreatePost {...modalProps} />
		</header>
	)
}

export default Header
