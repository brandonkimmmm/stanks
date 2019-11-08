'use strict';
module.exports = (sequelize, DataTypes) => {
	const Team = sequelize.define('Team', {
		team_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true
		},
		full_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		abbrev: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		team_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		underscored: true,
		tableName: 'Teams'
	});
	Team.associate = function(models) {
		// associations can be defined here
		Team.belongsToMany(models.Player, { through: models.Player_Team, as: 'players', foreignKey: 'team_row_id' });
	};
	return Team;
};