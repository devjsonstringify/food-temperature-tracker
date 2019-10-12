import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom' //eslint-disable-line
import { connect } from 'react-redux'
import useForm from 'react-hook-form'
import axios from 'axios'
import { Container, Header, Form, Icon, Grid, Message } from 'semantic-ui-react' //eslint-disable-line
import DatePicker from 'react-datepicker'
import { format, parseISO } from 'date-fns' //eslint-disable-line
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment' //eslint-disable-line

//import local components
import Button from '../assets/Button.js'

const AddFood = ({ history: { push }, food }, ...props) => {
	const initialState = {
		name: null,
		date: new Date(),
		category: null,
		temperature: null,
		remarks: null
	}

	//React useState
	const [state, setState] = useState(initialState)
	const {
		register,
		handleSubmit,
		setError,
		errors,
		clearError,
		getValues,
		triggerValidation,
		setValue,
		formState
	} = useForm({
		mode: 'onBlur'
	})

	//If food temperature is not pass the standard set remark
	const populateRemarks = (food, temp) => {
		return food == 'spag-sauce' && temp >= parseInt(170)
			? 'Pass'
			: food == 'gravy' && temp >= parseInt(206)
			? 'Pass'
			: food == 'patty' && temp >= parseInt(165)
			? 'Pass'
			: food == 'steak-sauce' && temp >= parseInt(180)
			? 'Pass'
			: 'Fail'
	}

	//This handle form submit
	const onSubmit = async ({ name, date, category, temperature }, e) => {
		e.preventDefault()

		if (!date) return setError('date')

		const getFoodDetails = {
			name,
			date: moment(date).toString(),
			category,
			temperature,
			remarks: populateRemarks(category, temperature)
		}

		console.log(getFoodDetails.date)

		const setNewFoodDetails = await axios
			.post('/api/v1/foods/create', getFoodDetails)
			.then(res => push('/foods'))
			.catch(err => {
				console.error(err)
			})
		return setNewFoodDetails
		//After submission clear form
		setState({
			...state,
			name: null,
			date: null,
			category: null,
			temperature: null,
			remarks: null
		})
	}

	//Automatically add food category from redux event
	const isCategory = food ? food : '--e.g., spag-sauce--'

	//This handle calendar event and to set value of react-hoks-form register-setValue
	const handleDateChange = value => {
		setValue('date', value)
		setState({ ...state, date: value })
	}
	//React useEffect
	useEffect(() => {
		//Manually set date with useForm
		register({ name: 'date' }, { required: true })
		async function dateInitialValue(state) {
			await setValue('date', state)
		}
		dateInitialValue(state.date)
	}, [state])

	return (
		<Container fluid>
			<Grid centered padded>
				<Grid.Column width={6}>
					<Grid.Row fluid="true">
						<Header textAlign="center" size="medium">
							Add new food
						</Header>
						<Form error onSubmit={handleSubmit(onSubmit)}>
							<Grid.Column>
								<Form.Field>
									<label htmlFor="name">Name</label>
									<input
										className={errors.name ? 'error' : null}
										defaultValue={state.name && state.name}
										type="text"
										placeholder="e.g., e.hughes@downton.org.uk"
										name="name"
										ref={register({ required: true })}
									/>
									{errors.name && (
										<Message
											w
											error
											content="Name field is required."
										/>
									)}
								</Form.Field>
							</Grid.Column>

							<Grid.Column>
								<Form.Field>
									<label htmlFor="category">Category</label>
									<select
										name="category"
										ref={register({ required: true })}
									>
										<option defaultValue={isCategory}>
											{' '}
											{isCategory}
										</option>
									</select>
									{errors.category && (
										<Message
											error
											content="Category field is required."
										/>
									)}
								</Form.Field>
							</Grid.Column>
							<Grid.Column>
								<Form.Field>
									<label htmlFor="temperature">
										Temperature
									</label>
									<input
										defaultValue={state.temperature}
										type="number"
										placeholder="e.g., 100ºC"
										name="temperature"
										ref={register({ required: true })}
									/>
									{errors.temperature && (
										<Message
											error
											content="Temperature field is required."
										/>
									)}
								</Form.Field>
							</Grid.Column>

							<Grid.Column>
								<Form.Field>
									<label htmlFor="date">Date</label>
									<DatePicker
										placeholderText="e.g., September 11, 2019 1:22 PM"
										strictParsing
										name="date"
										onChange={e => handleDateChange(e)}
										selected={state.date}
										showTimeSelect
										timeFormat="HH:mm"
										timeIntervals={1}
										dateFormat="MMMM d, yyyy h:mm aa"
										timeCaption="time"
									/>
									{errors.date && (
										<Message
											error
											content="Date field is required."
										/>
									)}
								</Form.Field>
							</Grid.Column>
							<Button primary fluid type="submit">
								submit
							</Button>
						</Form>
					</Grid.Row>
				</Grid.Column>
			</Grid>
		</Container>
	)
}

const mapStateToProps = ({ food }) => ({
	food
})

const AddFoodContainer = connect(
	mapStateToProps,
	null
)(AddFood)

export default AddFoodContainer
