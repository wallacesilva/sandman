var fs = require('fs'),
	path = require('path'),
	dirname = path.dirname(path.dirname(__dirname));

module.exports.getConfig = function(key) {
	var content = JSON.parse(fs.readFileSync(path.join(dirname, 'config.json'), 'utf-8'));

	return content[key];
}