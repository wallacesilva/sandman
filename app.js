require('./lib/system/utils');

var express = require('express'),
	swig = require('swig'),
	fs = require('fs'),
	path = require('path'),
	lessMiddleware = require('less-middleware'),
	i18n = require('./lib/system/locale'),
	db = require('./lib/system/db');

var application = express();

application.configure(function() {
	application.engine('html', swig.renderFile);

	application.use(lessMiddleware({
		src: path.join(__dirname),
		compress: true,
		debug: true
	}))

	application.use('/assets', express.static(path.join(__dirname, 'assets')))

	application.set('views', __dirname + '/views');
	application.set('view engine', 'html');

	application.use(i18n.init);
	application.use(express.json());
	application.use(express.urlencoded());
	application.use(express.logger());
	application.use(express.bodyParser());
	application.use(express.methodOverride());
	application.use(express.cookieParser());
	application.use(express.session({ secret: 'mi!f7+(v615h^06cv22_%hy^t(f2n*xx30_9*0ajy=3xc6_b0y'}));
	application.use(application.router);

	application.use(function(req, res, next) {
		res.status(404);
		console.log(application.routes)
		if(req.accepts('html')) {
			res.render('404', {
				'path': req.url, 
				'url': req.host + req.url, 
				'routes': application.routes
			})
		}
	})
})

fs.readdirSync('./controllers').forEach(function(controller) {
	if(path.extname(controller) == '.js') {
		route = require('./controllers/' + controller);
		route(application);
	}
});

// console.log("validating models\n");

var date = new Date().format("F d, Y - H:i:s");
console.log(date);
console.log("Nomerce version 1.0.0");

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