'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Teams', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			team_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				unique: true
			},
			full_name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			abbrev: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			team_name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			city: {
				type: Sequelize.STRING,
				allowNull: false
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
		return queryInterface.dropTable('Teams');
	}
};