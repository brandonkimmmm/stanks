'use strict';

const { User } = require('../../db/models');
const { isEmail } = require('validator');
const { loginUser, findUserByEmail } = require('../helpers/user');

const signup = (req, res) => {
	const { first_name, last_name, username, email, password, dob } = req.swagger.params.data.value;
	if (!isEmail(email)) throw new Error('Must enter a valid email');
	User.findOne({
		where: {
			email
		}
	})
		.then((user) => {
			if (user) throw new Error('User already exists');
			return User.create({
				first_name,
				last_name,
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

	loginUser(email, password)
		.then((token) => {
			res.json({ token });
		})
		.catch((error) => {
			res.status(error.status || 401).json({ message: error.message });
		});
};

const getUser = (req, res) => {
	const email = req.swagger.params.email.value;
	if (!isEmail(email)) throw new Error('Invalid email');

	findUserByEmail(email)
		.then((user) => {
			res.json(user);
		})
		.catch((error) => {
			res.status(error.status || 400).json({ message: error.message });
		});
};

module.exports = {
	signup,
	login,
	getUser
};