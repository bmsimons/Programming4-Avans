var id = 0;

class Game {
	constructor(name, producer, year, genre) {
		this.id = id
		this.name = name
		this.producer = producer
		this.year = year
		this.genre = genre

		id++
	}
}

module.exports = Game