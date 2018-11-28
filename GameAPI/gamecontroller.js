let games = [{
	id: 0,
	name: 'Battlefield 5',
	producer: 'EA',
	year: 2018,
	genre: 'FPS'
}]

var idCounter = 1;

module.exports = {
	getAll(req, res) {
		res.status(200).json(games).end()
	},

	getById(req, res) {
		var result = null

		games.forEach((item) => {
			if (item.id == req.params.gameId) {
				result = item
			}
		})

		if (result) {
			res.status(200).json(result).end()
		} else {
			res.status(404).json({
				message: 'No game with your specified ID has been found in the system.'
			}).end()
		}
	},

	addNewGame(req, res) {
		games.push({
			id: idCounter,
			name: req.body.name,
			producer: req.body.producer,
			year: req.body.year,
			genre: req.body.genre
		})

		idCounter++

		res.status(200).json({
			message: 'Game succesfully added.'
		})
	}
}