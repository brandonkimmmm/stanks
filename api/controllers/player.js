'use strict';

const { loggerPlayer } = require('../../config/logger');
const { findPlayers, findPlayerStats, findPlayer } = require('../helpers/player');

const getPlayers = (req, res) => {
	loggerPlayer.verbose('controllers/player/getPlayers', 'request');

	findPlayers()
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.status(error.status || 400).json({ message: error.message });
		});
};

const getPlayerStats = (req, res) => {
	const player_name = req.swagger.params.player_name.value;
	loggerPlayer.verbose('controllers/player/getPlayerStats', player_name);

	findPlayerStats(player_name)
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.status(error.status || 400).json({ message: error.message });
		});
};

const getPlayer = (req, res) => {
	const playerName = req.swagger.params.player_name.value;
	loggerPlayer.verbose('controllers/player/getPlayer', playerName);

	findPlayer(playerName)
		.then((player) => {
			res.json(player);
		})
		.catch((error) => {
			res.status(error.status || 400).json({ message: error.message });
		});
};

module.exports = {
	getPlayers,
	getPlayer,
	getPlayerStats
};