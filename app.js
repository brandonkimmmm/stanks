'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
require('dotenv').config();
module.exports = app; // for testing

const { validateToken } = require('./api/helpers/auth');

var config = {
	appRoot: __dirname, // required config
	swaggerSecurityHandlers: {
		Bearer: validateToken
	}
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
	if (err) { throw err; }

	// install middleware
	swaggerExpress.register(app);

	var port = process.env.PORT || 10010;
	app.listen(port);

	if (swaggerExpress.runner.swagger.paths['/hello']) {
		console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
	}
});
