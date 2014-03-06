var utils = require('./utils'),
	mongoose = require('mongoose'),
	fs = require('fs'),
	path = require('path'),
	dirname = path.dirname(path.dirname(__dirname)),
	application = require('./app');

var connection = undefined;

function getConnection() {
	if (connection == undefined) {
		connection = mongoose.connect("mongodb://{username}:{password}@{url}:{port}/{name}".format(application.get('database')));

		var db = connection.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback() {
			// opened
		})
	}
	return connection;
}

function model(object) {
	var mongoose = getConnection();
	var model = utils.dictExclude(object, /^(?!__)\w/g);
	var settings = utils.dictExclude(object, /^__\w/g);

	if(settings.__tablename__ == undefined) throw new Error("__tablename__ is required in model")

	return mongoose.model(settings.__tablename__, mongoose.Schema(model))
}

module.exports = {
	getConnection: getConnection,
	model: model
}