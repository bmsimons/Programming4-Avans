module.exports = {
	addNewGameValidation(body) {
		if (body.name !== null && body.producer !== null && body.year !== null && body.genre !== null) {
			return true
		} else {
			return false
		}
	},

	updateGameValidation(body) {
		if (body.id !== null && body.name !== null && body.producer !== null && body.year !== null && body.genre !== null) {
			return true
		} else {
			return false
		}
	},

	registerValidation(body) {
		if (body.firstname !== null && body.lastname !== null && body.email !== null && body.password !== null) {
			return true
		} else {
			return false
		}
	},

	loginValidation(body) {
		if (body.email !== null && body.password !== null) {
			return true
		} else {
			return false
		}
	}
}