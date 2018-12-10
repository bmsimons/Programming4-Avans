const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const bodyParser = require('body-parser')
const Game = require('../game')

chai.should()
chai.use(chaiHttp)

var token = ""

describe('Games API auth', () => {
	before((done) => {
		chai.request(server)
			.post('/login')
			.send({email: 'user@server.nl', password: 'secret'})
			.end((err, res) => {
				if (!err) {
					res.should.have.status(200)
					res.body.should.be.an('object')
					token = res.body.token
					done()
				}
			})
	})

	describe('Games API GET', () => {
		var firstObject = {}

		it('/games should return an object array', (done) => {
			chai.request(server)
				.get('/games')
				.set('x-auth-token', token)
				.end((err, res) => {
					if (!err) {
						res.should.have.status(200)
						res.body.should.be.an('array')
						if (res.body.length > 0) {
							firstObject = res.body[0]
							done()
						}
					}
				})
		})

		it(`/games/${firstObject.id} should return ONLY the first object`, (done) => {
			chai.request(server)
				.get(`/games/${firstObject.id}`)
				.set('x-auth-token', token)
				.end((err, res) => {
					if (!err) {
						res.should.have.status(200)
						res.body.should.be.an('object')
						if (res.body.id == firstObject.id && res.body.name == firstObject.name && res.body.producer == firstObject.producer && res.body.year == firstObject.year && res.body.genre == firstObject.genre) {
							done()
						}
					}
				})
		})
	})

	var gameToDelete = {}

	describe('Games API POST', () => {
		var newGame = new Game(0, 'Rocket League', 'Psyonix', 2015, 'UNKNOWN')

		it('Creating new game should return the newly created game as an object', (done) => {
			chai.request(server)
				.post('/games')
				.set('x-auth-token', token)
				.send(newGame)
				.end((err, res) => {
					if (!err) {
						res.should.have.status(200)
						res.body.should.be.an('object')
						if (res.body.name == newGame.name && res.body.producer == newGame.producer && res.body.year == newGame.year && res.body.genre == newGame.genre) {
							gameToDelete = res.body
							done()
						}
					}
				})
		})
	})

	describe('Games API DELETE', () => {
		it('Deleting newly created game should return the exact same object', (done) => {
			chai.request(server)
				.delete('/games/'+gameToDelete.id)
				.set('x-auth-token', token)
				.end((err, res) => {
					if (!err) {
						res.should.have.status(200)
						res.body.should.be.an('object')
						if (res.body.id == gameToDelete.id && res.body.name == gameToDelete.name && res.body.producer == gameToDelete.producer && res.body.year == gameToDelete.year && res.body.genre == gameToDelete.genre) {
							done()
						}
					}
				})
		})
	})
})