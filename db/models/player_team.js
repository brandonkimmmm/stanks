'use strict';
module.exports = (sequelize, DataTypes) => {
	const Player_Team = sequelize.define('Player_Team', {
		team_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		team: {
			type: DataTypes.STRING,
			allowNull: false
		},
		team_row_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		player: {
			type: DataTypes.STRING,
			allowNull: false
		},
		player_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		player_row_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		from: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		to: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null
		}
	}, {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		underscored: true,
		freezeTableName: true,
		tableName: 'Player_Team'
	});
	Player_Team.associate = function(models) {
		// associations can be defined here
	};
	return Player_Team;
};