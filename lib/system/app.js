require('./utils');

var express = require('express'),
	swig = require('swig'),
	path = require('path'),
	lessMiddleware = require('less-middleware'),
	i18n = require('./locale'),
	core = require('./core');

var application = express();

application.configure(function() {
	application.engine('html', swig.renderFile);

	application.use(lessMiddleware({
		src: path.join(__dirname),
		compress: true,
		debug: true
	}))

	application.set('database', core.getConfig('database'));

	application.use('/assets', express.static(path.join(__dirname, 'assets')));

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
		if(req.accepts('html')) {
			res.render('404', {
				'path': req.url, 
				'url': "{protocol}://{host}{url}".format({protocol: req.protocol, host: req.host, url: req.url}), 
				'routes': application.routes
			})
		}
	})
})

module.exports = application;