import React from 'react'
import './Header.scss'
import { Nav } from 'react-bootstrap'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

const PAGE_ROUTES = {
	news: { route: '/index', label: 'News' },
	safety: { route: '/safety', label: 'Safety' },
	forum: { route: '/forum', label: 'Forum' }
}
const { news, safety, forum } = PAGE_ROUTES

const Header = () => (
	<header className="">
		<div className="d-flex align-items-center justify-content-between">
			<h1 className="site-title">CovidCoach Forum</h1>
			<div className="">
				<Avatar alt={'author'} src={''} />
				<Button variant="contained">Default</Button>
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

export default Header
