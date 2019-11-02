'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    full_name: DataTypes.STRING,
    abbrev: DataTypes.STRING,
    team_name: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
  };
  return Team;
};