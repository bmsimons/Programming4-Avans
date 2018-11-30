class ApiError {
	constructor(msg, code) {
		this.message = msg;
		this.code = code;
		this.date = new Date()
	}
}

module.exports = ApiError