'use strict';

const { loggerPlayer } = require('../../config/logger');
const { findPlayerStats } = require('../helpers/player');

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

module.exports = {
	getPlayerStats
};