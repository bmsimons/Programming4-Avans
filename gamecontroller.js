const inputValidation = require('./inputvalidation.js')
const Game = require('./game.js')
const ApiError = require('./error.js')

let games = [new Game('Battlefield 5', 'EA', 2018, 'FPS'), new Game('Rocket League', 'Psyonix', 2017, 'Sports')]

var idCounter = 1;

module.exports = {
	getAll(req, res) {
		res.status(200).json(games).end()
	},

	getById(req, res, next) {
		var result = null

		games.forEach((item) => {
			if (item.id == req.params.gameId) {
				result = item
			}
		})

		if (result) {
			res.status(200).json(result).end()
		} else {
			next(new ApiError('No game with your specified ID has been found in the system.', 404))
		}
	},

	addNewGame(req, res) {
		if (inputValidation.addNewGameValidation(req.body)) {
			games.push(new Game(req.body.name, req.body.producer, req.body.year, req.body.genre))

			idCounter++

			res.status(200).json({
				message: 'Game succesfully added.'
			})
		} else {
			res.status(400).json({
				message: 'Invalid request body.'
			})
		}
	},

	deleteGame(req, res) {
		games.forEach((item, index, object) => {
			if (item.id == req.params.gameId) {
				object.splice(index, 1)
				return
			}
		})

		res.status(200).json({
			message: 'Game succesfully removed.'
		})
	},

	updateGame(req, res) {
		if (inputValidation.updateGameValidation(req.body)) {
			games.forEach((item, index, object) => {
				if (item.id == req.body.id) {
					games[index] = req.body
					return
				}
			})

			res.status(200).json({
				message: 'Game succesfully updated.'
			})
		} else {
			res.status(400).json({
				message: 'Invalid request body.'
			})
		}
	}
}