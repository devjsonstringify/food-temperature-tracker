// Define schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FoodModelSchema = new Schema(
	{
		name: { type: String, required: [true, 'Why no name?'] },
		category: { type: String, required: [true, 'Why no category?'] },
		temperature: { type: Number, required: [true, 'Why no temperature?'] },
		remarks: { type: String },
		date: { type: Date }
	},
	{
		timestamps: true
	}
)

// Compile model from schema
const Food = mongoose.model('food', FoodModelSchema)

module.exports = Food
