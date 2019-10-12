import React, { useEffect, useState } from 'react' //eslint-disable-line
import axios from 'axios'

export default (method, url) => {
	//declare useEffect
	const [value, setValue] = useState({ data: [] })
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const initialState = {
				method: method,
				url: url
			}
			//Toggle setIsError and setIsLoading
			setIsError(false)
			setIsLoading(true)
			//Conditoonally Checking data
			try {
				const result = await axios(initialState)
				setValue(result.data)
			} catch (err) {
				setIsError(true)
			}
			//Return to default
			setIsLoading(false)
		}
		//Run func
		fetchData(value)
	}, [value.length])
	return { value, setValue, isLoading, isError } //eslint-disable-line
}
