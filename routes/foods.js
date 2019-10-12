//import packages
const router = require('express').Router()
const food = require('../models/foodModel')
// const { format } = require('date-fns')

/*http://localhost:5000/foods this will run
WIll display all foods on our database */
router.route('/foods').get(async (req, res) => {
	//get total items
	const numOfResult = await food.countDocuments()

	//Check if has an error otherwise
	try {
		const foods = await food.find()
		res.json({
			confirmation: 'success',
			message: 'All foods available',
			data: foods,
			numOfResult
		})
	} catch (err) {
		res.status(400).json({
			confirmation: 'failed',
			Error: err
		})
	}
})

/*GET request all patty
http://localhost:5000/foods/patty/ */
router.route('/foods/patty').get(async (req, res) => {
	const catPatty = { category: 'patty' }
	const numOfResult = await food.countDocuments(catPatty)
	try {
		const foods = await food.find(catPatty)
		res.json({
			confirmation: 'success',
			message: 'Showing all patties.',
			data: foods,
			numOfResult
		})
	} catch (err) {
		res.status(400).json({
			confirmation: 'failed',
			Error: err
		})
	}
})

/*GET request  single patty
http://localhost:5000/foods/id */
router.route('/foods/:id').get(async (req, res) => {
	//Check if has an error otherwise
	const foodId = req.params.id
	try {
		const item = await food.findById(foodId)
		res.json({
			confirmation: 'success',
			message: 'Single item',
			data: item
		})
	} catch (err) {
		res.status(400).json({
			confirmation: 'failed',
			Error: err
		})
	}
})

/* POST request to create new patty
http://localhost:5000/foods/patty/create */
router.route('/foods/create').post(async (req, res) => {
	// Get all data from client
	const newAddedItem = new food({
		name: req.body.name,
		date: req.body.date,
		category: req.body.category,
		temperature: req.body.temperature,
		remarks: req.body.remarks
	})

	//Check if has an error otherwise
	try {
		const newFood = await newAddedItem.save()
		res.json({
			confirmation: 'success',
			message: 'New food is created'
		})
	} catch (err) {
		res.status(400).json({
			confirmation: 'failed',
			Error: err
		})
	}
})

/* DELETE request to delete patty
localhost:5000/foods/id/delete */
router.route('/foods/:id/delete').delete(async (req, res) => {
	//Check if has an error otherwise
	const foodId = req.params.id
	try {
		const deletedResponse = await food.findByIdAndDelete(foodId)
		res.json({
			confirmation: 'Deleted success',
			data: {
				_id: deletedResponse._id,
				name: deletedResponse.name,
				category: deletedResponse.category,
				temperature: deletedResponse.temperature
			}
		})
	} catch (err) {
		res.status(400).json({
			confirmation: 'failed',
			Error: JSON.stringify(err)
		})
	}
})

/* UPDATE request of patty specific iD
http://localhost:5000/foods/patty/id/update */
/*
Patch - only update what details provided
Put - update data must submit all details
*/
router.route('/foods/:id/update').put(async (req, res) => {
	//Check if has an error otherwise
	const foodId = req.params.id
	const updatedFood = {
		date: req.body.date,
		name: req.body.name,
		category: req.body.category,
		temperature: req.body.temperature,
		remarks: req.body.remarks
	}
	try {
		const item = await food.updateOne({ _id: foodId }, { $set: updatedFood })
		res.json({
			confirmation: 'success',
			data: item
		})
	} catch (err) {
		res.status(400).json({
			confirmation: 'failed',
			Error: err
		})
	}
})

module.exports = router
