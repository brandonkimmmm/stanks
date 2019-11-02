'use strict';

const teamData = require('../seedData/teams.json');
const { each } = require('lodash');
const teams = [];


each(teamData, (value, key) => {
	const data = {
		full_name: key,
		abbrev: value.Abbrev,
		team_name: value.TeamName,
		city: value.City
	};
	teams.push(data);
});

console.log(teams);

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Teams', teams);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Teams', null, {});
	}
};
