import React from 'react'
import { connect } from 'react-redux'
import {
	Container,
	Grid,
	Image,
	Card,
	Segment,
	Button
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v1'

//import local file
import burger from '../assets/burger.png'
import drinks from '../assets/drinks.png'
import fries from '../assets/fries.png'
import pizza from '../assets/pizza.png'

//import redux file
import { getFoodSelected } from '../redux/action.js'

//Component
const AddFoodBox = ({ imgSource, foodName }, props) => {
	return (
		<Card fluid>
			<Image
				src={imgSource}
				wrapped
				ui={false}
				size="medium"
				centered
				fluid
			/>
			<Card.Content>
				<Card.Header>{foodName}</Card.Header>
			</Card.Content>
		</Card>
	)
}

const AddFoodBoxData = [
	{ text: 'spag-sauce', imgSource: burger, url: '/add' },
	{ text: 'steak-sauce', imgSource: fries, url: '/add' },
	{ text: 'patty', imgSource: drinks, url: '/add' },
	{ text: 'gravy', imgSource: pizza, url: '/add' }
]
const FoodGrid = ({ getFoodSelected }, ...props) => {
	return (
		<Container className="home">
			<Grid centered stackable columns={AddFoodBoxData.length}>
				<Grid.Row>
					{AddFoodBoxData.map(({ text, imgSource, url }) => {
						return (
							<Grid.Column key={uuid()} width={6}>
								<Button onClick={() => getFoodSelected(text)}>
									<Link to={url}>
										<AddFoodBox
											imgSource={imgSource}
											foodName={text}
										/>
									</Link>
								</Button>
							</Grid.Column>
						)
					})}
				</Grid.Row>
			</Grid>
		</Container>
	)
}

const mapDispatchToProps = {
	getFoodSelected
}

const FoodGridContainer = connect(
	null,
	mapDispatchToProps
)(FoodGrid)

export default FoodGridContainer
