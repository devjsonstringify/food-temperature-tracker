import React from 'react'
import { Route, Switch } from 'react-router-dom'

//import local files
import ListOfFoods from '../containers/listOfFoods.js'
import ViewFood from '../components/viewFood.js'

const Users = props => (
	<Switch>
		<Route exact path="/foods" component={ListOfFoods} />
		<Route path="/foods/:id" component={ViewFood} />
	</Switch>
)

export default Users
