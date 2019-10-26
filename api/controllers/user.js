'use strict';

const { User } = require('../../db/models');
const { isEmail } = require('validator');
const { issueToken } = require('../helpers/token');

const signup = (req, res) => {
	const { firstName, lastName, username, email, password, dob } = req.swagger.params.data.value;
	if (!isEmail(email)) throw new Error('Must enter a valid email');
	User.findOne({
		where: {
			email
		}
	})
		.then((user) => {
			if (user) throw new Error('User already exists');
			return User.create({
				firstName,
				lastName,
				password,
				dob,
				username,
				email
			})
		})
		.then((user) => {
			res.json({message: 'Success'});
		})
		.catch((error) => {
			res.status(error.status || 400).json({ message: error.message });
		});
};

const login = (req, res) => {
	const { email, password } = req.swagger.params.data.value;
	if (!isEmail(email)) throw new Error('Invalid email');
	User.findOne({
		where: {
			email
		}
	})
		.then((user) => {
			if (!user) throw new Error ('Email not found');
			if (!user.validatePassword(password)) throw new Error ('Not Authorized');
			return issueToken(user);
		})
		.then((token) => {
			res.json({ token });
		})
		.catch((error) => {
			res.status(error.status || 401).json({ message: error.message });
		});
};

module.exports = {
	signup,
	login
};