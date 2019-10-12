//import packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//create server
const app = express()

//save crederntials on .env file with dotnev
require('dotenv').config()

//import Routes
const foodsRouter = require('./routes/foods')
const indexRouter = require('./routes/index')

//Deployment
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'))
	})
}

// serves the built version of your react app

//middleware
app.use(cors())
app.use(express.json())
app.use('/', indexRouter)
app.use('/api/v1/', foodsRouter)
//handle 404 page
app.use((req, res, next) => {
	res.status(404).send("Sorry can't find that!")
	next()
})

//Set up default mongoose connection
const uri =
	process.env.ATLAS_URI ||
	'mongodb+srv://dbMern:mern-1@cluster0-mggsr.mongodb.net/admin?retryWrites=true'
mongoose.connect(uri, { useNewUrlParser: true })

//Get the default connection
const db = mongoose.connection

//Bind connection to succesfull event
db.once('open', () => {
	console.log('MongoDB database connection established successfully')
}).on('error', console.error.bind(console, 'MongoDB connection error:'))
//Bind connection to error event (to get notification of connection errors)

//listening to port
const port = process.env.PORT || 5000
app.listen(port, () =>
	console.log(`Listening on port http://localhost:${port}`)
)
