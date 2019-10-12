//import packages
const router = require('express').Router()

// http://localhost:5000/ this will run
router.route('/').get((req, res) => {
	res.send('Welcome to Backend architectute with express and node.js')
})

module.exports = router
