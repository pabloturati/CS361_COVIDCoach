import React from 'react'
import './Header.scss'
import { Nav } from 'react-bootstrap'

const PAGE_ROUTES = {
	news: { route: '/index', label: 'News' },
	safety: { route: '/safety', label: 'Safety' },
	forum: { route: '/forum', label: 'Forum' }
}
const { news, safety, forum } = PAGE_ROUTES

const Header = () => (
	<React.Fragment>
		<header className="d-flex align-items-center justify-content-between">
			<h1 className="site-title">CovidCoach Forum</h1>
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
	</React.Fragment>
)

export default Header
