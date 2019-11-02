'use strict';

const playerData = require('../seedData/players.json');
const { each } = require('lodash');
const players = [];

each(playerData, (value, key) => {
	const [ first_name, last_name ] = key.split(' ');
	const data = {
		first_name,
		last_name,
		player_id: value.player_id,
		draft: value.draft,
		retired: value.retired,
		dob: value.dob,
		dob_within_season: value.dob_within_season,
		nickname: value.nickname
	};
	players.push(data);
});

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Players', players);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Players', null, {});
	}
};
