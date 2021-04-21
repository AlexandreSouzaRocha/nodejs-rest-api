const { config } = require('dotenv');

const parsedEnv = config().parsed();

module.exports.env = {
	DB_USER: parsedEnv.DB_USER || 'developer_user',
	DB_HOST: parsedEnv.DB_HOST || '127.0.0.1',
	DB_PORT: parsedEnv.DB_PORT || '5432',
	DB_MIN_POOL: parsedEnv.DB_MIN_POOL || '1',
	DB_MAX_POOL: parsedEnv.DB_MAX_POOL || '3',
	DB_PASSWORD: parsedEnv.DB_PASSWORD || '$Z5a]m?6',
	DB_NAME: parsedEnv.DB_NAME || 'microservices',
	DB_CONNECTION_TIMEOUT_MILLIS: parsedEnv.DB_CONNECTION_TIMEOUT_MILLIS || '3000',
	DB_IDLE_TIMEOUT_MILLIS: parsedEnv.DB_IDLE_TIMEOUT_MILLIS || '3000',
	ENV: parsedEnv.ENV || 'dev',
};
