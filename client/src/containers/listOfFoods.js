import React, { useEffect, useState } from 'react' //eslint-disable-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Header, Segment, Dimmer, Loader } from 'semantic-ui-react'
import uuid from 'uuid/v1'
import { Icon, Modal } from 'semantic-ui-react'
import _ from 'lodash'
import axios from 'axios'

//import local components
import useToFetch from '../components/useEndpoint'
import PageTitle from '../components/pageTitle'
import FoodsListTable from '../components/table'
import Button from '../assets/Button.js'
import FormattedTimeandDate from '../assets/dateAndTime.js'

export default props => {
	//Call react custom hooks
	const { value, setValue, isError, isLoading } = useToFetch(
		`GET`,
		`/api/v1/foods/`
	)
	//Off course, func to handle delete button event
	async function deleteFood(_id) {
		const deletedItem = await axios.delete(
			'/api/v1/foods/' + _id + '/delete'
		)
		const newFoodsList = _.filter(deletedItem.data, key => !key._id)
		setValue(newFoodsList)
	}

	//This data will populate the table
	const columns = [
		{
			Header: '',
			id: 'row',
			maxWidth: 30,
			Cell: row => {
				return <span>{row.index + 1}.</span>
			}
		},
		{
			Header: 'DATE',
			id: 'date',
			Cell: row => <FormattedTimeandDate date={row.original.date} />,
			style: {
				textAlign: 'center'
			}
		},
		{
			Header: 'NAME',
			accessor: 'name',
			style: {
				textAlign: 'center'
			}
		},
		{
			Header: 'CATEGORY',
			accessor: 'category',
			style: {
				textAlign: 'center'
			}
		},
		{
			Header: 'TEMPERATURE',
			accessor: 'temperature',
			maxWidth: 150,
			width: 150,
			style: {
				textAlign: 'center'
			}
		},
		{
			Header: 'Remarks',
			accessor: 'remarks',
			maxWidth: 100,
			width: 100,
			style: {
				textAlign: 'center'
			}
		},
		{
			Header: 'OPTIONS',
			id: 'test',
			style: {
				textAlign: 'center'
			},
			filterable: false,
			Cell: ({ original: { _id } }) => {
				return (
					<div>
						<Button onClick={() => deleteFood(_id)}>Delete</Button>
						<Link to={`/foods/${_id}`}>
							<Button primary>View</Button>
						</Link>
					</div>
				)
			}
		}
	]

	return (
		<div>
			<Header
				as="h2"
				content="Food Tracker"
				subheader="Manage your food details"
			/>
			{isError && <div>Something went wrong ...</div>}
			{isLoading ? (
				<Dimmer active inverted>
					<Loader inverted content="Loading" />
				</Dimmer>
			) : value.data != undefined && value.data.length > 0 ? (
				<FoodsListTable
					data={value.data}
					columns={columns}
					loadingText="Loading..."
					noDataText="No rows found"
				/>
			) : (
				<p>
					Ooops! no food yet! add one <Link to="/add">now.</Link>
				</p>
			)}
		</div>
	)
}
