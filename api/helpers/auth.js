'use strict'

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { loggerAuth } = require('../../config/logger');

const validateToken = (req, securityDescription, token, cb) => {
	const sendError = (msg) => {
		loggerAuth.error('helpers/token/validateToken');
		return new Error(`Access Denied: ${msg}`);
	};

	if (token && token.indexOf('Bearer ') == 0) {
		const tokenString = token.split(' ')[1];
		jwt.verify(tokenString, SECRET, (error, token) => {
			if (!error && token) {
				loggerAuth.verbose(
					'helpers/auth/verifyToken verified_token',
					token.sub
				);
				req.auth = token;
				cb(null);
			} else {
				cb(sendError('Invalid Token'));
			}
		})
	} else {
		cb(sendError('Missing Header'));
	}
}

module.exports = {
	validateToken
}