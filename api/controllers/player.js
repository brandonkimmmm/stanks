'use strict';

const { loggerPlayer } = require('../../config/logger');
const { Player, Team } = require('../../db/models');
const { query } = require('../../db/helpers');
const nba = require('nba-api-client');
const { each } = require('lodash');

const getPlayerStats = (req, res) => {
	console.log('hello')
	const player_name = req.swagger.params.player_name.value;
	loggerPlayer.verbose('controllers/player/getPlayerStats', player_name);
	let birthday = '';
	let seasons = {};

	Player.findOne({
		where: {
			full_name: player_name
		}
	})
		.then((player) => {
			if (!player) throw new Error('Player not found');
			birthday = player.dataValues.dob.substr(5);
			return query('SELECT "Player".*, "teams"."id" AS "teams.id", "teams"."team_id" AS "teams.team_id", "teams"."full_name" AS "teams.full_name", "teams"."abbrev" AS "teams.abbrev", "teams"."team_name" AS "teams.team_name", "teams"."city" AS "teams.city", "teams"."created_at" AS "teams.created_at", "teams"."updated_at" AS "teams.updated_at", "teams->Player_Team"."team_id" AS "teams.Player_Team.team_id", "teams->Player_Team"."team" AS "teams.Player_Team.team", "teams->Player_Team"."team_row_id" AS "teams.Player_Team.team_row_id", "teams->Player_Team"."player" AS "teams.Player_Team.player", "teams->Player_Team"."player_id" AS "teams.Player_Team.player_id", "teams->Player_Team"."player_row_id" AS "teams.Player_Team.player_row_id", "teams->Player_Team"."from" AS "teams.Player_Team.from", "teams->Player_Team"."to" AS "teams.Player_Team.to", "teams->Player_Team"."created_at" AS "teams.Player_Team.created_at", "teams->Player_Team"."updated_at" AS "teams.Player_Team.updated_at" FROM (SELECT "Player"."id", "Player"."full_name", "Player"."first_name", "Player"."last_name", "Player"."player_id", "Player"."draft", "Player"."retired", "Player"."dob", "Player"."dob_within_season", "Player"."nickname", "Player"."created_at", "Player"."updated_at" FROM "Players" AS "Player" WHERE "Player"."first_name" = \'LeBron\' LIMIT 1) AS "Player" LEFT OUTER JOIN ( "Player_Team" AS "teams->Player_Team" INNER JOIN "Teams" AS "teams" ON "teams"."id" = "teams->Player_Team"."team_row_id") ON "Player"."id" = "teams->Player_Team"."player_row_id";')
		})
		.then((data) => {
			each(data, (team) => {
				const from = team['teams.Player_Team.from'];
				let to;
				if (team['teams.Player_Team.to']) {
					to = team['teams.Player_Team.to'];
				} else {
					to = 2019;
				}
				for (let i = from + 1; i <= to; i++) {
					let beginning = i - 1
					const season = beginning.toString() + '-' + to.toString().substr(3);
					seasons[season] = {
						team_id: team['teams.team_id'],
						// team_name: team['teams.full_name'],
						player_id: team.player_id,
						player_name: team.full_name,
					}
				}
				// nba.teamPlayerStats({TeamID: team.teams.team_id, Season: '2003-04', SeasonType: 'Regular+Season', DateFrom: '2003-12-29', DateTo: '2003-12-31'}).then(function(data){
				// 	console.log(data)
				// })
			})
			console.log(seasons);
		})
		.catch((error) => {
			// console.log(error);
		});
};

module.exports = {
	getPlayerStats
};