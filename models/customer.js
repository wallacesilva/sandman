var db = require('../lib/system/db');

module.exports = db.model({
	__tablename__: "Customer",
	name: String,
	email: String,
	password: String,
	telephone: String,
	mobile: String,
	addressZipCode: String,
	addressDetails: String
})