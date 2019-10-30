'use strict';

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { loggerToken } = require('../../config/logger');

const issueToken = (id, email) => {
	loggerToken.debug('helpers/token/issueToken', id, email);
	const token = jwt.sign({
		sub: {
			id,
			email
		},
		expiresIn: '1d',
		iss: 'stanks'
	},
	SECRET);
	return token;
};

module.exports = {
	issueToken
};