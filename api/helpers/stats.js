'use strict';

const { add, divide, format } = require('mathjs');

const getAverageTraditionalStats = (games) => {
	const avg = {
		gp: 0,
		w: 0,
		l: 0,
		wPct: 0,
		min: 0,
		fgm: 0,
		fga: 0,
		fgPct: 0,
		fg3m: 0,
		fg3a: 0,
		fg3Pct: 0,
		ftm: 0,
		fta: 0,
		ftPct: 0,
		oReb: 0,
		dReb: 0,
		reb: 0,
		ast: 0,
		to: 0,
		stl: 0,
		blk: 0,
		pf: 0,
		pts: 0,
		plusMinus: 0
	};

	return new Promise((resolve, reject) => {
		return Promise.all([
			games.map((game) => {
				avg.gp++;
				avg.w += game.W,
				avg.l += game.L,
				avg.wPct = add(avg.wPct, game.W_PCT);
				avg.min = add(avg.min, game.MIN);
				avg.fgm += game.FGM;
				avg.fga += game.FGA;
				avg.fgPct = add(avg.fgPct, game.FG_PCT);
				avg.fg3m += game.FG3M;
				avg.fg3a += game.FG3A;
				avg.fg3Pct = add(avg.fg3Pct, game.FG3_PCT);
				avg.ftm += game.FTM;
				avg.fta += game.FTA;
				avg.ftPct = add(avg.ftPct, game.FT_PCT);
				avg.oReb += game.OREB;
				avg.dReb += game.DREB;
				avg.reb += game.REB;
				avg.ast += game.AST;
				avg.to += game.TOV;
				avg.stl += game.STL;
				avg.blk += game.BLK;
				avg.pf += game.PF;
				avg.pts += game.PTS;
				avg.plusMinus += game.PLUS_MINUS;
			})
		])
			.then(() => {
				avg.wPct = format(divide(avg.wPct, avg.gp), { precision: 5 });
				avg.min = format(divide(avg.min, avg.gp), { precision: 5 });
				avg.fgm = format(divide(avg.fgm, avg.gp), { precision: 5 });
				avg.fga = format(divide(avg.fga, avg.gp), { precision: 5 });
				avg.fgPct = format(divide(avg.fgPct, avg.gp), { precision: 5 });
				avg.fg3m = format(divide(avg.fg3m, avg.gp), { precision: 5 });
				avg.fg3a = format(divide(avg.fg3a, avg.gp), { precision: 5 });
				avg.fg3Pct = format(divide(avg.fg3Pct, avg.gp), { precision: 5 });
				avg.ftm = format(divide(avg.ftm, avg.gp), { precision: 5 });
				avg.fta = format(divide(avg.fta, avg.gp), { precision: 5 });
				avg.ftPct = format(divide(avg.ftPct, avg.gp), { precision: 5 });
				avg.oReb = format(divide(avg.oReb, avg.gp), { precision: 5 });
				avg.dReb = format(divide(avg.dReb, avg.gp), { precision: 5 });
				avg.reb = format(divide(avg.reb, avg.gp), { precision: 5 });
				avg.ast = format(divide(avg.ast, avg.gp), { precision: 5 });
				avg.to = format(divide(avg.to, avg.gp), { precision: 5 });
				avg.stl = format(divide(avg.stl, avg.gp), { precision: 5 });
				avg.blk = format(divide(avg.blk, avg.gp), { precision: 5 });
				avg.pf = format(divide(avg.pf, avg.gp), { precision: 5 });
				avg.pts = format(divide(avg.pts, avg.gp), { precision: 5 });
				avg.plusMinus = format(divide(avg.plusMinus, avg.gp), { precision: 5 });
				resolve(avg);
			});
	});
};

module.exports = {
	getAverageTraditionalStats
};