import React from 'react'
import moment from 'moment'

export default function({ date }) {
	return <span>{moment(date).format('llll')}</span>
}
