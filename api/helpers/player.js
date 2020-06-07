'use strict';

const { Player, Season } = require('../../db/models');
const nba = require('nba');
const { getAverageTraditionalStats } = require('./stats');
const moment = require('moment');

const findPlayers = () => {
	return Player.findAll();
};

const findPlayer = (full_name) => {
	return Player.findOne({
		where: {
			full_name
		}
	});
};

const findPlayerStats = (name) => {
	return Player.findOne({
		where: {
			full_name: name
		},
		include: {
			model: Season
		}
	})
		.then((player) => {
			if (!player) throw new Error('Player not found');
			let birthday = player.dataValues.dob.substr(4);
			return findStats(player.Seasons, player.player_id, birthday);
		})
		.then((games) => {
			return getAverageTraditionalStats(games);
		});
};

const findStats = (seasons, playerId, birthday) => {
	return new Promise((resolve, reject) => {
		const stats = [];
		const promises = [];
		Promise.all([seasons.map((season) => {
			const month = parseInt(birthday.substr(1, 2));
			let date;
			let startYear = season.from;
			let endYear = season.from + 1;
			if (month >= 1 && month <= 6) {
				date = endYear.toString() + birthday;
			} else if (month <= 12 && month >= 10) {
				date = startYear.toString() + birthday;
			} else {
				throw new Error('Player never played on his birthday');
			}
			promises.push(nba.stats.playerStats({
				TeamID: season.team_id,
				Season: season.from_to,
				SeasonType: 'Regular Season',
				DateFrom: date,
				DateTo: date
			}));
			if (moment(date).isBefore(startYear.toString() + '-10-31')) {
				promises.push(nba.stats.playerStats({
					TeamID: season.team_id,
					Season: season.from_to,
					SeasonType: 'Pre Season',
					DateFrom: date,
					DateTo: date
				}));
			} else if (moment(date).isAfter(endYear.toString() + '-02-10') && moment(date).isBefore(endYear.toString() + '-02-20')) {
				promises.push(nba.stats.playerStats({
					TeamID: season.team_id,
					Season: season.from_to,
					SeasonType: 'All Star',
					DateFrom: date,
					DateTo: date
				}));
			} else if (moment(date).isAfter(endYear.toString() + '-04-10')) {
				promises.push(nba.stats.playerStats({
					TeamID: season.team_id,
					Season: season.from_to,
					SeasonType: 'Playoffs',
					DateFrom: date,
					DateTo: date
				}));
			}
		})])
			.then(() => {
				return Promise.all(promises);
			}).then((data) => {
				return Promise.all([data.map((season) => {
					const players = season.PlayersSeasonTotals;
					Object.keys(players).map((id) => {
						if (players[id].PLAYER_ID === playerId) {
							stats.push(players[id]);
						}
					});
				})]);
			})
			.then(() => {
				if (stats.length === 0) {
					throw new Error('Player never played on his birthday');
				}
				resolve(stats);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

module.exports = {
	findPlayers,
	findPlayer,
	findPlayerStats
};