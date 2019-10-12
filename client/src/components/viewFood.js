import React, { useEffect, useState } from 'react' //eslint-disable-line
import { Route, Switch, Link } from 'react-router-dom'
import uuid from 'uuid/v1' //eslint-disable-line
import {
	Container,
	Card,
	Table,
	Icon,
	Grid,
	Button,
	Image
} from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
import useForm from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format, parse } from 'date-fns'

//import local components
import useToFetch from '../components/useEndpoint.js'
import EditFood from '../components/editFood.js'
import FormattedTimeandDate from '../assets/dateAndTime.js'

const ViewContainer = ({
	match: {
		params: { id }
	},
	...props
}) => {
	//React.useState
	const { value, isError, isLoading } = useToFetch(
		'GET',
		`http://localhost:5000/api/v1/foods/${id}`
	)

	const { register, handleSubmit, errors, setValue } = useForm({
		mode: 'onSubmit'
	})

	const isPass = value.data.remarks == 'Pass' ? 'green' : 'red'
	const isThumbUp = value.data.remarks == 'Pass' ? 'thumbs up' : 'thumbs down'

	//Object destructuring o value.data
	const { _id, date, name, category, temperature, remarks } = value.data

	return (
		<div>
			{isError && <div>Something went wrong ...</div>}
			{isLoading ? (
				<div>Loading...</div>
			) : (
				value && (
					<Container fluid>
						<Grid centered padded>
							<Grid.Column width={6}>
								<Card fluid centered>
									<Card.Content>
										<Image
											floated="right"
											size="mini"
											src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
										/>
										<Card.Meta>Taken By:</Card.Meta>
										<Card.Header>{name}</Card.Header>
									</Card.Content>
									<Table definition padded>
										<Table.Body>
											<Table.Row>
												<Table.Cell width={2}>
													ID
												</Table.Cell>
												<Table.Cell>{_id}</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>
													Date created
												</Table.Cell>
												<Table.Cell>
													<FormattedTimeandDate
														date={date}
													/>
												</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>
													CATEGORY
												</Table.Cell>
												<Table.Cell>
													{category}
												</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>
													TEMPERATURE
												</Table.Cell>
												<Table.Cell>
													{temperature}
													&#8451;
												</Table.Cell>
											</Table.Row>
											<Table.Row>
												<Table.Cell>REMARKS</Table.Cell>
												<Table.Cell>
													<Icon
														color={isPass}
														name={isThumbUp}
													/>
													{remarks}
												</Table.Cell>
											</Table.Row>
										</Table.Body>
									</Table>
									<Card.Content>
										<div className="ui two buttons"></div>
										<Button.Group>
											<Link to={`/foods/`}>
												<Button>Cancel</Button>
											</Link>
											<Button.Or />
											<Link to={`/foods/edit/${_id}`}>
												<Button primary>Edit</Button>
											</Link>
										</Button.Group>
									</Card.Content>
								</Card>
							</Grid.Column>
						</Grid>
					</Container>
				)
			)}
		</div>
	)
}

const ViewFood = props => (
	<Switch>
		<Route exact path="/foods/:id" component={ViewContainer} />
		<Route path="/foods/edit/:id" component={EditFood} />
	</Switch>
)
export default ViewFood
