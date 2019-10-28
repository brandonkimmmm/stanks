'use strict';

const { User } = require('../../db/models');
const { issueToken } = require('./token');

const findUser = (email) => {
	return User.findOne({
		where: {
			email
		}
	});
};

const loginUser = (email, password) => {
	return User.findOne({
		where: {
			email
		}
	})
		.then((user) => {
			if (!user) throw new Error ('Email not found');
			if (!user.validatePassword(password)) throw new Error ('Not Authorized');
			return issueToken(user);
		});
};

const findUserByEmail = (email) => {
	return User.findOne({
		where: {
			email: email.toLowerCase()
		},
		attributes: {
			exclude: [ 'password' ]
		}
	})
		.then((user) => {
			if (!user) throw new Error('User not found');
			return user.dataValues;
		});
};

module.exports = {
	findUserByEmail,
	loginUser
}