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

i = 1;
each(playerTeamData, (value, key) => {
	each(value, (playerTeam) => {
		const teamId = playerTeam.team_id.toString();
		const data = {
			id: i,
			team_id: playerTeam.team_id,
			team: teamList[teamId].fullName,
			team_row_id: teamList[teamId].teamRowId,
			player: key,
			player_row_id: playerList[key].playerRowId,
			player_id: playerList[key].playerId,
			from: playerTeam.from,
			to: playerTeam.to
		};
		insertPlayerTeam.push(data);
		i++;
	});
});

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('Players', insertPlayers);
		await queryInterface.bulkInsert('Teams', insertTeams);
		await queryInterface.bulkInsert('Player_Team', insertPlayerTeam);
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete('Player_Team', null, {});
		await queryInterface.bulkDelete('Players', null, {});
		await queryInterface.bulkDelete('Teams', null, {});
	}
};
