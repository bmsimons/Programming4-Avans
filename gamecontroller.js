const inputValidation = require('./inputvalidation.js')
const Game = require('./game.js')
const ApiError = require('./error.js')
const pool = require('./db.js')

let games = [new Game('Battlefield 5', 'EA', 2018, 'FPS'), new Game('Rocket League', 'Psyonix', 2017, 'Sports')]

var idCounter = 1;

module.exports = {
	getAll(req, res) {
		pool.query("SELECT * FROM games", function (err, rows, fields) {
			if(err) {
				return next(new ApiError("Database error", 500))
			} else {
				let games = []
				rows.forEach((e) => {
					games.push(new Game(e.ID, e.title, e.producer, e.year, e.Type))
				})
				res.status(200).json(games).end()
			}
		})
	},

	getById(req, res, next) {
		var result = null

		pool.query(`SELECT * FROM games WHERE ID = ${parseInt(req.params.gameId)}`, function (err, rows, fields) {
			if (err) {
				next(new ApiError("Database error", 500))
			} else {
				if (rows.length !== 0) {
					rows.forEach((e) => {
						res.status(200).json(new Game(e.ID, e.title, e.producer, e.year, e.Type))
						return
					})
				} else {
					next(new ApiError('No game with your specified ID has been found in the system.', 404))
				}
			}
		})
	},

	addNewGame(req, res, next) {
		if (inputValidation.addNewGameValidation(req.body)) {
			pool.query('INSERT INTO games (title, producer, year, Type) VALUES (?, ?, ?, ?);', [req.body.name, req.body.producer, parseInt(req.body.year), req.body.genre], function(err, rows, fields) {
				if (err) {
					next(new ApiError("Database error.", 500))
				} else {
					res.status(200).json(new Game(rows.insertId, req.body.name, req.body.producer, req.body.year, req.body.genre))	
				}
			})
		} else {
			next(new ApiError('Invalid request body.', 400))
		}
	},

	deleteGame(req, res, next) {
		pool.query(`SELECT * FROM games WHERE ID = ${parseInt(req.params.gameId)}`, function (err, rows, fields) {
			if (err) {
				next(new ApiError("Database error", 500))
			} else {
				if (rows.length !== 0) {
					rows.forEach((e) => {
						pool.query(`DELETE FROM games WHERE ID = ${parseInt(req.params.gameId)}`, function(err, rows, fields) {
							if (err) {
								next(new ApiError(err, 500))
							} else {
								res.status(200).json(new Game(e.ID, e.title, e.producer, e.year, e.Type))
							}
						})
						return
					})
				} else {
					next(new ApiError('No game with your specified ID has been found in the system.', 404))
				}
			}
		})
	},

	updateGame(req, res, next) {
		if (inputValidation.updateGameValidation(req.body)) {
			pool.query('UPDATE games SET title = ?, producer = ?, year = ?, Type = ? WHERE ID = ?;', [req.body.name, req.body.producer, parseInt(req.body.year), req.body.genre, req.body.id], function(err, rows, fields) {
				console.log(rows)
				if (err) {
					next(new ApiError("Database error.", 500))
				} else {
					res.status(200).json(new Game(req.body.id, req.body.name, req.body.producer, req.body.year, req.body.genre))	
				}
			})
		} else {
			next(new ApiError('Invalid request body.', 400))
		}
	}
}