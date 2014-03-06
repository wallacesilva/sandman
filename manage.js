require('./lib/system/utils');

var application = require('./lib/system/app'),
	fs = require('fs'),
	path = require('path');


fs.readdirSync('./controllers').forEach(function(controller) {
	if(path.extname(controller) == '.js') {
		route = require('./controllers/' + controller);
		route(application);
	}
});

// console.log("validating models\n");

var date = new Date().format("F d, Y - H:i:s");
console.log(date);
console.log("Sandman version 1.0.0");

var server = application.listen(3000, function() {
	console.log('Starting express server at http://' + this.address().address + ":" + this.address().port);
	console.log('Quit the server with CONTROL-C.');
});

server.on('error', function ( err ) {
	if (err['code'] == 'EADDRINUSE') {
		console.log('Error: That port is already in use.');
	} else {
		console.log(err);
	}
    process.exit(1);
});