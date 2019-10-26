'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		lastName: {
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
			allowNull: false
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
		instanceMethods: {
			validPassword(password) {
				return bcrypt.compareSync(password, this.password);
			}
		}
	});

	User.beforeCreate((user) => {
		user.email = user.email.toLowerCase();
		user.firstName = user.firstName.charAt(0).toUpperCase(0) + user.firstName.slice(1);
		user.lastName = user.lastName.charAt(0).toUpperCase(0) + user.lastName.slice(1);
		return bcrypt.hash(user.password, 8).then((hash) => {
			user.password = hash;
		});
	});

	User.associate = function(models) {
		// associations can be defined here
	};
	return User;
};