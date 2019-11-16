'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn(
			'Players',
			'image',
			Sequelize.STRING
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn(
			'Players',
			'image',
		);
	}
};
