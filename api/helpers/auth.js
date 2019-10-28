'use strict'

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const validateToken = (req, securityDescription, token, cb) => {
	const sendError = (msg) => {
		return new Error(`Access Denied: ${msg}`);
	};

	if (token && token.indexOf('Bearer ') == 0) {
		const tokenString = token.split(' ')[1];
		jwt.verify(tokenString, SECRET, (error, token) => {
			if (!error && token) {
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