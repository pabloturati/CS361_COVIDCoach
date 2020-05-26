import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const DateConverter = ({ date }) => moment(date).format('MMMM Do YYYY')

Date.propTypes = {
	date: PropTypes.string.isRequired
}

export default DateConverter
