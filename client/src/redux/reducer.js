import { SELECTED_FOOD } from './constants.js'

const initialState = {
	food: null
}

function gridBoxFoodReducer(state = initialState, action) {
	if (action.type === SELECTED_FOOD) {
		return action.payload
	}
	return state
}

export default gridBoxFoodReducer
