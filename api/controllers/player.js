'use strict';

const { loggerPlayer } = require('../../config/logger');
const { findPlayerStats } = require('../helpers/player');

const getPlayerStats = (req, res) => {
	const player_name = req.swagger.params.player_name.value;
	loggerPlayer.verbose('controllers/player/getPlayerStats', player_name);

	findPlayerStats(player_name).then((data) => console.log(data))
};

module.exports = {
	getPlayerStats
};