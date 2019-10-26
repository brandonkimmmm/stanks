'use strict';

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const issueToken = (id, email) => {
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