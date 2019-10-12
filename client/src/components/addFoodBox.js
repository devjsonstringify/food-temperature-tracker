import React from 'react'
import { Image, Segment } from 'semantic-ui-react'

export default function AddFoodBox({ imgSource }, props) {
	return (
		<Segment padded="very">
			<Image src={imgSource} wrapped ui={true} size="small" centered />
		</Segment>
	)
}
