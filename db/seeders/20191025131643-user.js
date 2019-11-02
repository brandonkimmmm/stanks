'use strict';

const moment = require('moment-timezone');
const bcrypt = require('bcrypt');
let password = bcrypt.hashSync('asdf1234', 8);

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [{
			first_name: 'brandon',
			last_name: 'kim',
			email: 'bkim2490@gmail.com',
			username: 'brandonkimmmm',
			password,
			dob: moment('1990-12-24 08:10:00').tz('Asia/Seoul').format()
		}]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
