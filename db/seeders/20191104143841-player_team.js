'use strict';

let playerData = require('../seedData/players.json');
const teamData = require('../seedData/teams.json');
const playerTeamData = require('../seedData/player_team.json');
const { each } = require('lodash');
const insertPlayers = [];
const insertTeams = [];
const insertPlayerTeam = [];
let teamList = {};
let playerList = {};
let i = 1;

each(playerData, (value, key) => {
	const [ first_name, last_name ] = key.split(' ');
	let data = {
		full_name: key,
		first_name,
		last_name,
		player_id: value.player_id,
		draft: value.draft,
		retired: value.retired,
		dob: value.dob,
		dob_within_season: value.dob_within_season,
		nickname: value.nickname
	};
	insertPlayers.push(data);
	playerList[key] = {
		playerRowId: i,
		playerId: value.player_id,
	};
	i++;
});

i = 1;
each(teamData, (value, key) => {
	const data = {
		team_id: value.TeamID,
		full_name: key,
		abbrev: value.Abbrev,
		team_name: value.TeamName,
		city: value.City
	};
	insertTeams.push(data);
	teamList[value.TeamID] = {
		teamRowId: i,
		fullName: key
	};
	i++;
});

const seasons = [];

i = 1;
each(playerTeamData, (value, key) => {
	each(value, (playerTeam) => {
		const player = key;
		const dataFrom = playerTeam.from;
		const dataTo = playerTeam.to || 2020;

		for (let i = dataFrom; i < dataTo; i++) {
			const toNum = i + 1;
			const to = toNum.toString().substr(2);
			const from_to = i.toString() + '-' + to;
			const data = {
				from_to,
				from: i,
				to: toNum,
				team_id: playerTeam.team_id,
				player_id: playerList[player].playerRowId,
				team_name: teamList[playerTeam.team_id].fullName
			};
			seasons.push(data);
		}
		i++;
	});
});

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('Players', insertPlayers);
		await queryInterface.bulkInsert('Teams', insertTeams);
		await queryInterface.bulkInsert('Seasons', seasons);
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete('Seasons', null, {});
		await queryInterface.bulkDelete('Players', null, {});
		await queryInterface.bulkDelete('Teams', null, {});
	}
};
