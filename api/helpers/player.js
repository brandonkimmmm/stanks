'use strict';

const { Player, Season } = require('../../db/models');
const nba = require('nba-api-client');
const { getAverageTraditionalStats } = require('./stats');

const findPlayers = () => {
	return Player.findAll()
		.then((players) => {
			return players;
		})
}

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
			const date = season.from.toString() + birthday;
			promises.push(nba.teamPlayerStats({
				TeamID: season.team_id,
				Season: season.from_to,
				SeasonType: 'Regular+Season',
				DateFrom: date,
				DateTo: date
			}));
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
				resolve(stats);
			});
	});
};

module.exports = {
	findPlayers,
	findPlayerStats
};