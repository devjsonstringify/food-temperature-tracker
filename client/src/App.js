import React, { useEffect, useState } from 'react' //eslint-disable-line
import { Table, Container } from 'react-bootstrap' //eslint-disable-line
import { BrowserRouter as Router, Route } from 'react-router-dom' //eslint-disable-line
import { Provider } from 'react-redux'
import store from './redux/store.js'

//import local components
import Navigantion from './components/navigation'
import Main from './routes/'
import './App.css'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Container>
					<Navigantion />
					<Main />
				</Container>
			</Router>
		</Provider>
	)
}

export default App
