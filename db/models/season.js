'use strict';
module.exports = (sequelize, DataTypes) => {
	const Season = sequelize.define('Season', {
		from_to: {
			type: DataTypes.STRING,
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
		},
		team_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		team_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		player_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Players',
				key: 'id'
			},
			onDelete: 'CASCADE'
		}
	}, {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		underscored: true,
		tableName: 'Seasons',
	});
	Season.associate = function(models) {
		// associations can be defined here
		Season.belongsTo(models.Player, {
			foreignKey: 'player_id'
		});
	};
	return Season;
};