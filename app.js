'use strict';

require('dotenv').config();

const { createServer } = require('http');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const morgan = require('morgan');
const { stream, logger } = require('./config/logger');
const { validateToken } = require('./api/helpers/auth');

const PORT = process.env.PORT || 10010;

const server = createServer(app);

module.exports = app; // for testing

var config = {
	appRoot: __dirname, // required config
	swaggerSecurityHandlers: {
		Bearer: validateToken
	}
};

app.use(morgan('dev', { stream }));

SwaggerExpress.create(config, function(err, swaggerExpress) {
	if (err) { throw err; }

	// install middleware
	swaggerExpress.register(app);

	server.listen(PORT, () => {
		logger.info(`Server running on port: ${PORT}`);
	});
});
