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
			if (!user.validatePassword(password)) throw new Error ('Wrong Password');
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

const updateUser = (email, username) => {
	const updateData = {};
	if (username) updateData.username = username;
	return findUser(email)
		.then((user) => {
			if (!user) throw new Error('User not found');
			return user.update(
				updateData,
				{
					fields: ['username'],
					returning: true
				}
			);
		})
		.then((user) => {
			delete user.dataValues.password;
			return user;
		});
};

const changePassword = (email, old_password, new_password) => {
	return findUser(email)
		.then((user) => {
			if (!user) throw new Error('User not found');
			if (!user.validatePassword(old_password)) throw new Error ('Wrong Password');
			user.update({
				password: new_password
			});
		});
};

module.exports = {
	findUserByEmail,
	loginUser,
	updateUser,
	changePassword
};