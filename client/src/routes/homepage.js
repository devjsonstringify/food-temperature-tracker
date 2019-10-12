import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'

import store from '../redux/store.js'

//import local file
import GridBoxes from '../containers/foodGrid.js'

const mapStateToProps = state => {
	return { articles: state.food }
}

const Boxes = () => {
	return <GridBoxes />
}

const Home = connect(mapStateToProps)(Boxes)
export default Home
