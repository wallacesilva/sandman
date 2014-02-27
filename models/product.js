var db = require('../lib/system/db');

module.exports = db.model({
	__tablename__: "Product",
	name: String
})