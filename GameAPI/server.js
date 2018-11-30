const express = require('express')
const bodyParser = require('body-parser')
const morgan  = require('morgan')
const gameController = require('./gamecontroller.js')

const port = 3000

var app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/games', gameController.getAll)
app.get('/games/:gameId', gameController.getById)
app.post('/games', gameController.addNewGame)
app.delete('/games/:gameId', gameController.deleteGame)
app.put('/games', gameController.updateGame)

app.listen(port, () => console.log(`Game API listening on port ${port}!`))