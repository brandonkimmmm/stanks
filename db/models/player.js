'use strict';
module.exports = (sequelize, DataTypes) => {
	const Player = sequelize.define('Player', {
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		player_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true
		},
		draft: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		retired: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		dob: {
			type: DataTypes.STRING,
			allowNull: false
		},
		dob_within_season: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		nickname: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		underscored: true,
		tableName: 'Players',
	});
	Player.associate = function(models) {
		// associations can be defined here
	};
	return Player;
};