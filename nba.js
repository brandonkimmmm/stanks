const nba = require('nba-api-client');

// nba.schedule().then((data) => console.log(data.lscd[0].mscd.g[0]));

nba.scoreboard({GameDate: '2018-09-28', LeagueId: '00'}).then((data) => console.log(data));