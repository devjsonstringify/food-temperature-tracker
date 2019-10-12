import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import uuid from 'uuid/v1'
import { Button, Icon } from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'

//import local components

export default props => {
	const intialState = {
		_id: '',
		name: '',
		date: new Date(),
		category: '',
		temperature: ''
	}
	const [value, setValue] = useState(intialState)
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		function getAllFoods() {
			//Toggle setIsError and setIsLoading
			setIsError(false)
			setIsLoading(true)
			//Conditoonally Checking data
			axios
				.get(
					'http://localhost:5000/api/v1/foods/' +
						props.match.params.id
				)
				.then(response => {
					setValue({
						...value,
						_id: response.data._id,
						name: response.data.name,
						date: new Date(response.data.date),
						category: response.data.category,
						temperature: response.data.temperature
					})
				})
				.catch(function(error) {
					setIsError(true)
				})
			//Return to default
			setIsLoading(false)
		}
		//Run func
		getAllFoods()
	}, [value.length])

	console.log(value)

	return (
		<div>
			{isError && <div>Something went wrong ...</div>}
			{isLoading ? (
				<div>Loading...</div>
			) : (
				value.data && <pre>{JSON.stringify(props, null, 2)}</pre>
			)}
		</div>
	)
}
