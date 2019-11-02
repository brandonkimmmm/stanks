const nba = require('nba-api-client');

// nba.schedule().then((data) => console.log(data.lscd[0].mscd.g[0]));

nba.scoreboard({GameDate: '2004-09-27', LeagueId: '00'}).then((data) => console.log(data));

// getTeamId()