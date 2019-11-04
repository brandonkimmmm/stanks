'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Players', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			full_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			first_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			last_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			player_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			draft: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			retired: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			dob: {
				type: Sequelize.STRING,
				allowNull: false
			},
			dob_within_season: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			nickname: {
				type: Sequelize.STRING,
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
			underscored: true
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Players');
	}
};