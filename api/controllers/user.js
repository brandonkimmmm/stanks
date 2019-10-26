'use strict';

const { User } = require('../../db/models');
const Op = require('sequelize').Op;
const { isEmail } = require('validator');

const signup = (req, res) => {
	const { firstName, lastName, username, email, password, dob } = req.swagger.params.data.value;
	if (!isEmail(email)) throw new Error('Must enter a valid email');
	User.findOne({
		where: {
			[Op.or]: [
				{
					email: {
						[Op.eq]: email
					}
				},
				{
					username: {
						[Op.eq]: username
					}
				}
			]
		}
	})
		.then((user) => {
			if (user) throw new Error('User already exists')
		})
		.then(() => {
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

module.exports = {
	signup
};