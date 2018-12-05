const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

describe('Games API GET', () => {
	it('/games should return an object array', (done) => {
		chai.request(server)
			.get('/games')
			.end((err, res) => {
				res.should.have.status(200)
				res.body.should.be.an('array')
				done()
			})
	})

	// it('/games/0 should return the first dummy object', (done) => {
	// 	chai.request(server)
	// 		.get('/games/0')
	// 		.end((err, res) => {
	// 			res.should.have.status(200)
	// 			res.body.should.be.an('object')
	// 			res.body.should.have.property('id').equals(0)
	// 			res.body.should.have.property('name').equals('Battlefield 5')
	// 			res.body.should.have.property('producer').equals('EA')
	// 			res.body.should.have.property('year').equals(2018)
	// 			res.body.should.have.property('genre').equals('FPS')

	// 			done()
	// 		})
	// })
})

// describe('Games API DELETE', () => {
// 	it('Deleting /games/0 should reduce the total of games to one', (done) => {
// 		chai.request(server)
// 			.delete('/games/0')
// 			.end((err, res) => {
// 				res.should.have.status(200)
// 			})

// 		chai.request(server)
// 			.get('/games')
// 			.end((err, res) => {
// 				res.should.have.status(200)
// 				res.body.should.be.an('array')

// 				if (res.body.length == 0) {
// 					done()
// 				}
// 			})
// 	})
// })