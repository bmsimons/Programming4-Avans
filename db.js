const mysql = require('mysql2');

const dbconfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}

const pool = mysql.createPool(dbconfig);

console.log(`Connected to database '${dbconfig.database}' on host '${dbconfig.host}'`)

module.exports = pool