import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const DateConverter = ({ date }) =>
	moment(date).format('MM-DD-YYYY @ h:mm:ss A')

Date.propTypes = {
	date: PropTypes.string.isRequired
}

export default DateConverter
