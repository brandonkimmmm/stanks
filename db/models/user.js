'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		dob: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		timestamp: true,
		underscored: true,
		instanceMethods: {
			validPassword(password) {
				return bcrypt.compareSync(password, this.password);
			}
		}
	});

	User.beforeCreate((user) => {
		user.email = user.email.toLowerCase();
		let firstName = user.first_name.toLowerCase();
		firstName[0] = firstName[0].toUpperCase();
		user.first_name = firstName;
		let lastName = user.last_name.toLowerCase();
		lastName[0] = lastName[0].toUpperCase();
		user.last_name = lastName;
		return bcrypt.generateHash(user.password).then((hash) => {
			user.password = hash;
		});
	});

	User.associate = function(models) {
		// associations can be defined here
	};
	return User;
};