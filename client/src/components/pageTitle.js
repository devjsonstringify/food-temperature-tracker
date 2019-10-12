import React from 'react'
import { Alert } from 'react-bootstrap'

export default ({ heading, paragraph, variant, headStyle, paraStyle }) => {
	return (
		<Alert variant={variant}>
			<Alert.Heading className={headStyle}>{heading}</Alert.Heading>
			<p className={paraStyle}>{paragraph}</p>
		</Alert>
	)
}
