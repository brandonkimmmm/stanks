'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Player_Team', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			team_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			team_row_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			team: {
				type: Sequelize.STRING,
				allowNull: false
			},
			player: {
				type: Sequelize.STRING,
				allowNull: false
			},
			player_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			player_row_id: {
				type: Sequelize.INTEGER,
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
		}, {
			timestamps: true,
			underscored: true,
			freezeTableName: true
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Player_Team');
	}
};