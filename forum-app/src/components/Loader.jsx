import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => (
	<div className="d-flex justify-content-center p-4">
		<Spinner animation="border" role="status" variant="secondary">
			<span className="sr-only">Loading...</span>
		</Spinner>
	</div>
)

export default Loader
