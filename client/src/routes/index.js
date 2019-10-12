import React from 'react'
import { Switch, Route } from 'react-router-dom'

//import local files
import HomePage from './homepage'
import AddFood from './../components/addFood'
import Foods from './foods'

const Main = () => (
	<main>
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route path="/add" component={AddFood} />
			<Route path="/foods" component={Foods} />
		</Switch>
	</main>
)

export default Main
