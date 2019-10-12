import { createStore } from 'redux'
import gridBoxFoodReducer from './reducer.js'

const store = createStore(
	gridBoxFoodReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store
