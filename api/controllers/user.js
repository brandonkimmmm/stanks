'use strict';

const { User } = require('../../db/models');
const { isEmail } = require('validator');
const { loginUser, findUserByEmail, updateUser, changePassword } = require('../helpers/user');
const { loggerUser } = require('../../config/logger');

const signup = (req, res) => {
	const { first_name, last_name, username, email, password, dob } = req.swagger.params.data.value;

	loggerUser.info('controllers/user/signup', first_name, last_name, username, email, dob);
	if (!isEmail(email)) {
		throw new Error('Must enter a valid email');
	}
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
			loggerUser.debug('controllers/user/signup', user.dataValues);
			res.json({message: 'Success'});
		})
		.catch((error) => {
			loggerUser.error('controllers/user/signup', error.message);
			res.status(error.status || 400).json({ message: error.message });
		});
};

const login = (req, res) => {
	const { email, password } = req.swagger.params.data.value;

	loggerUser.info('controllers/user/login', email);
	if (!isEmail(email)) throw new Error('Invalid email');

	loginUser(email, password)
		.then((token) => {
			loggerUser.debug('controllers/user/login', email, 'Successful login');
			res.json({ token });
		})
		.catch((error) => {
			loggerUser.error('controllers/user/login', email, error.message);
			res.status(error.status || 401).json({ message: error.message });
		});
};

const getUser = (req, res) => {
	const email = req.swagger.params.email.value;

	loggerUser.info('controllers/user/getUser', email);
	if (!isEmail(email)) throw new Error('Invalid email');

	findUserByEmail(email)
		.then((user) => {
			loggerUser.debug('controller/user/getUser', user.dataValues);
			res.json(user);
		})
		.catch((error) => {
			loggerUser.error('controllers/user/getUser', email, error.message);
			res.status(error.status || 400).json({ message: error.message });
		});
};

const putUser = (req, res) => {
	const email = req.swagger.params.email.value;
	const { username } = req.swagger.params.data.value;

	loggerUser.info('controllers/user/putUser', email, username);

	if (req.auth.sub.id.email !== email) throw new Error('Not Authorized');

	updateUser(email, username)
		.then((user) => {
			loggerUser.debug('controllers/user/putUser', user.dataValues);
			res.json(user);
		})
		.catch((error) => {
			loggerUser.error('controllers/user/putUser', error.message);
			res.status(error.status || 401).json({ message: error.message });
		});
};

const changeUserPassword = (req, res) => {
	const email = req.swagger.params.email.value;
	const { old_password, new_password } = req.swagger.params.data.value;

	loggerUser.info('controllers/user/changeUserPassword', email);

	if (req.auth.sub.id.email !== email) throw new Error('Not Authorized');

	changePassword(email, old_password, new_password)
		.then(() => {
			loggerUser.debug('controllers/user/changeUserpassword', email, 'Successful changed password');
			res.json({ message: 'Success' });
		})
		.catch((error) => {
			loggerUser.error('controllers/user/changeUserpassword', error.message);
			res.status(error.status || 401).json({ message: error.message });
		});
};

module.exports = {
	signup,
	login,
	getUser,
	putUser,
	changeUserPassword
};