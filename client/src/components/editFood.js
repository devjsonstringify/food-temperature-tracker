import React, { useEffect, useState, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import uuid from 'uuid/v1'
import {
	Container,
	Grid,
	Checkbox,
	Header,
	Form,
	Icon,
	Message,
	Segment,
	Label
} from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'
import useForm from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { parseISO, isValid } from 'date-fns'
import {
	zonedTimeToUtc,
	utcToZonedTime,
	format,
	formatToTimeZone,
	convertToTimeZone,
	parseFromTimeZone
} from 'date-fns-timezone'

//import local components
import useToFetch from '../components/useEndpoint.js'
import Button from '../assets/Button.js'

export default ({
	match: {
		params: { id }
	},
	history: { push },
	...props
}) => {
	const [state, setState] = useState({ data: [] })
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [load, setLoad] = useState(false)
	const {
		register,
		setValue,
		handleSubmit,
		errors,
		setError,
		getValues
	} = useForm({
		mode: 'onSubmit'
	})
	useEffect(() => {
		const fetchData = async () => {
			//Toggle setIsError and setIsLoading
			setIsError(false)
			setIsLoading(true)
			//Conditoonally Checking data
			try {
				const result = await axios(`/api/v1/foods/${id}`)
				setState(result.data)
				register({ name: 'date' }, { required: true })
				populateCalendar(state.data.date)
			} catch (err) {
				setIsError(true)
			}
			//Return to default
			setIsLoading(false)
		}
		//Run func
		fetchData(state)
	}, [state])

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

	//This will handle form submit
	const onSubmit = async state => {
		if (!state.date) return setError('date')
		const updatedDetails = {
			name: state.name,
			date: state.date,
			category: state.category,
			temperature: state.temperature,
			remarks: populateRemarks(state.category, state.temperature)
		}

		//for some reason i can't retrieve the default date-picker without touhing it.
		await axios
			.put('/api/v1/foods/' + id + '/update', updatedDetails)
			.then(res => push('/foods'))
			.catch(err => {
				console.error(err)
			})
		console.log(JSON.stringify(state, null, 2))
	}

	//handle calendar changed
	const handleCalendar = value => {
		setState({ ...state, date: value })
		console.log(JSON.stringify(value, null, 3))
	}

	function populateCalendar(value) {
		let createdDate = Date.parse(value)
		if (isValid(createdDate)) {
			setLoad(true)
			setValue('date', createdDate)
		}
	}

	return (
		<div>
			{isError && <div>Something went wrong ...</div>}
			{isLoading ? (
				<div>Loading...</div>
			) : (
				state && (
					<Container fluid>
						<Grid centered padded>
							<Header size="medium">Update food details</Header>
							<Grid.Column width={6}>
								<Form error onSubmit={handleSubmit(onSubmit)}>
									<Form.Field>
										<label htmlFor="name">Name</label>
										<input
											defaultValue={state.data.name}
											type="text"
											placeholder="e.g., e.hughes downton"
											name="name"
											ref={register({ required: true })}
										/>
										{errors.name && (
											<Message
												error
												content="Name field is required."
											/>
										)}
									</Form.Field>

									<Form.Field>
										<label htmlFor="category">
											Category
										</label>

										<select
											name="category"
											ref={register({ required: true })}
										>
											<option
												defaultValue={
													state.data.category
												}
											>
												{state.data.category}
											</option>
											<option value="spag-sauce">
												spag-sauce
											</option>
											<option value="gravy">gravy</option>
											<option value="patty">patty</option>
											<option value="steak-sauce">
												steak-sauce
											</option>
										</select>

										{errors.category && (
											<Message
												error
												content="Category field is required."
											/>
										)}
									</Form.Field>

									{load && (
										<Form.Field>
											<label htmlFor="date">Date</label>
											<DatePicker
												placeholderText="e.g., September 11, 2019 1:22 PM"
												name="date"
												onChange={handleCalendar}
												selected={parseISO(
													state.data.date
												)}
												showTimeSelect
												timeFormat="HH:mm"
												dateFormat="MMMM d, yyyy h:mm aa"
											/>
											{errors.date && (
												<Message
													error
													content="Date field is required."
												/>
											)}
										</Form.Field>
									)}

									<Form.Field>
										<label htmlFor="temperature">
											Temperature
										</label>
										<input
											defaultValue={
												state.data.temperature
											}
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

									<Button primary type="submit">
										Update
									</Button>
								</Form>
								<Segment textAlign="center">
									<Link to={`/foods/${id}`}>
										Go back to previous page
									</Link>
								</Segment>
							</Grid.Column>
						</Grid>
					</Container>
				)
			)}
		</div>
	)
}
