import { SELECTED_FOOD } from './constants.js'

export const getFoodSelected = food => {
	return {
		type: SELECTED_FOOD,
		payload: {
			food
		}
	}
}
