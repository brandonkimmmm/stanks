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
		underscored: true,
		tableName: 'Users'
	});

	User.beforeCreate((user) => {
		user.email = user.email.toLowerCase();
		user.first_name = user.first_name.charAt(0).toUpperCase(0) + user.first_name.slice(1);
		user.last_name = user.last_name.charAt(0).toUpperCase(0) + user.last_name.slice(1);
		return bcrypt.hash(user.password, 8).then((hash) => {
			user.password = hash;
		});
	});

	User.associate = function(models) {
		// associations can be defined here
	};

	User.prototype.validatePassword = function(password) {
		console.log(password, this.password)
		return bcrypt.compareSync(password, this.password);
	};

	return User;
};