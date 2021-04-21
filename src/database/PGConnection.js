const { Pool } = require('pg');
const { env } = require('../env');

class PGConnection {
	#options;

	#logger;

	constructor({ logger }) {
		this.#logger = logger;
		this.#options = {
			user: env.DB_USER,
			database: env.DB_NAME,
			password: env.DB_PASSWORD,
			port: parseInt(env.DB_PORT, 10),
			host: env.DB_HOST,
			min: parseInt(env.DB_MIN_POOL, 10),
			max: parseInt(env.DB_MAX_POOL, 10),
			connectionTimeoutMillis: parseInt(env.DB_CONNECTION_TIMEOUT_MILLIS, 10),
			idleTimeoutMillis: parseInt(env.DB_IDLE_TIMEOUT_MILLIS, 10),
		};
	}

	async createConnection() {
		this.#logger.info({
			event: 'PGConnection.createConnection',
			message: 'CREATE DATABASE CONNECTION',
		});

		const pool = new Pool(this.#options);

		return pool.connect();
	}

	static async closeConnection(connection) {
		if (connection) {
			await connection.release(true);

			this.#logger.info({
				event: 'PGConnection.createConnection',
				message: 'CONNECTION RELEASED',
			});
		}
	}
}

module.exports = PGConnection;
