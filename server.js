const express = require('express')
const bodyParser = require('body-parser')
const morgan  = require('morgan')
const gameController = require('./gamecontroller.js')
const authController = require('./authcontroller.js')
const ApiError = require('./error.js')

const port = process.env.PORT || 3000

var app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/games', gameController.getAll)
app.get('/games/:gameId', gameController.getById)
app.post('/games', gameController.addNewGame)
app.delete('/games/:gameId', gameController.deleteGame)
app.put('/games', gameController.updateGame)

app.post('/register', authController.registerUser)
app.post('/login', authController.loginUser)

app.use('*', (req, res, next) => {
	next(new ApiError('Non-existing endpoint', 404))
})

app.use('*', (err, req, res, next) => {
	console.dir(err)
	res.status(err.code).json({error: err}).end()
})

module.exports = app.listen(port, () => console.log(`Game API listening on port ${port}!`))