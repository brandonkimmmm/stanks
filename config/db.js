'use strict'

const { loggerDb } = require('../config/logger');

const logging = (sql) => {
	loggerDb.debug(sql);
}

module.exports = {
	'development': {
		'username': 'postgres',
		'password': 'postgres',
		'database': 'stanks',
		'host': '127.0.0.1',
		'port': 5432,
		'dialect': 'postgres',
		'operatorsAliases': false,
		logging
	},
	'test': {
		'username': 'root',
		'password': null,
		'database': 'database_test',
		'host': '127.0.0.1',
		'dialect': 'mysql',
		'operatorsAliases': false
	},
	'production': {
		'username': 'root',
		'password': null,
		'database': 'database_production',
		'host': '127.0.0.1',
		'dialect': 'mysql',
		'operatorsAliases': false
	}
}
