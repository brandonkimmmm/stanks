'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Seasons', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			from_to: {
				type: Sequelize.STRING,
				allowNull: false
			},
			from: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			to: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			team_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			team_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			player_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Players',
					key: 'id'
				},
				onDelete: 'CASCADE'
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('NOW()')
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('NOW()')
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Seasons');
	}
};