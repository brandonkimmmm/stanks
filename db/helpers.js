const db = require('./models/index');
const Sequelize = require('sequelize');

const query = (sql) => {
	return db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT});
}

module.exports = {
	query
};