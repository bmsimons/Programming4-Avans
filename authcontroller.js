const inputValidation = require('./inputvalidation.js')
const User = require('./user.js')
const ApiError = require('./error.js')
const pool = require('./db.js')
const moment = require('moment');
const jwt = require('jsonwebtoken');

module.exports = {
	registerUser(req, res, next) {
		if (inputValidation.registerValidation(req.body)) {
			pool.query('INSERT INTO users (firstname,lastname,email,password) VALUES (?,?,?,?);', [req.body.firstname, req.body.lastname, req.body.email, req.body.password], function(err, rows, fields) {
				if (err) {
					next(new ApiError("Database error.", 500))
				} else {
					res.status(200).json(new User(req.body.firstname, req.body.lastname, req.body.email, req.body.password))
				}
			})
		} else {
			next(new ApiError('Invalid request body.', 400))
		}
	},

	loginUser(req, res, next) {
		if (inputValidation.loginValidation(req.body)) {
			pool.query('SELECT * FROM users WHERE email = ?', [req.body.email], function(err, rows, fields) {
				if (err) {
					next(new ApiError("Database error.", 500))
				} else {
					if (rows.length == 0) {
						next(new ApiError("Invalid username.", 401))
					}
					rows.forEach((e) => {
						if (req.body.password == e.password) {
							const payload = {
								exp: moment().add(10, 'days').unix(),
								iat: moment().unix(),
								sub: req.body.username,
								uid: e.ID
							}

							res.status(200).json({token: jwt.sign(payload, 'HMAC_SHA_256_SECRET_KEY_GOES_HERE')})
						} else {
							next(new ApiError("Invalid password.", 401))
						}
						return
					})
				}
			})
		} else {
			next(new ApiError('Invalid request body.', 400))
		}
	} 
}