'use strict';

const winston = require('winston');
const { format, transports, config } = winston;
const { combine, timestamp, colorize, printf, align, json } = format;
const { isObject } = require('lodash');
const { SPLAT } = require('triple-beam');

const CONSOLE_LEVEL = 'debug';

const formatObject = (param) => {
	if (isObject(param)) {
		return JSON.stringify(param);
	}
	return param;
};

const all = format((info) => {
	const splat = info[SPLAT] || [];
	const message = formatObject(info.message);
	const rest = splat.map(formatObject).join(' ');
	info.message = `${message} ${rest}`;
	return info;
});

const generateLoggerConfiguration = (name) => {
	const transportsConfig = [
		new transports.Console({ level: CONSOLE_LEVEL })
	];

	// if (APM_ENABLED) {
	// 	transportsConfig.push(new ElasticsearchApm({ apm }));
	// }

	const config = {
		format: combine(
			all(),
			timestamp(),
			colorize(),
			align(),
			printf(
				(info) =>
					`${info.timestamp} ${info.level}: ${formatObject(info.message)}`
			)
		),
		transports: transportsConfig
	};
	// if (isMainnet) {
	// 	config.format = combine(
	// 		all(),
	// 		timestamp(),
	// 		json()
	// 	);
	// }

	return config;
};

const LOGGER_NAMES = {
	db: 'db',
	api: 'api',
	user: 'user',
	general: 'general',
	auth: 'auth',
	token: 'token'
};

winston.loggers.add('default', generateLoggerConfiguration('all', false));

Object.entries(LOGGER_NAMES).forEach(([key, value], index) => {
	winston.loggers.add(value, generateLoggerConfiguration(value));
});

const logger = winston.loggers.get('default');

const stream = {
	write: (message, encoding) => {
		logger.info(message);
	}
};

module.exports = {
	logger,
	stream,
	loggerDb: winston.loggers.get(LOGGER_NAMES.db),
	loggerApi: winston.loggers.get(LOGGER_NAMES.api),
	loggerUser: winston.loggers.get(LOGGER_NAMES.user),
	loggerGeneral: winston.loggers.get(LOGGER_NAMES.general),
	loggerAuth: winston.loggers.get(LOGGER_NAMES.auth),
	loggerToken: winston.loggers.get(LOGGER_NAMES.token)
};