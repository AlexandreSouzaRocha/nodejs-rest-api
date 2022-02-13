import { Pool } from 'pg';
import CONFIG from '../config/index.mjs';
import logger from '../commons/Logger.mjs';

class PGConnection {
  #options;

  #client;

  constructor() {
    this.#options = {
      user: CONFIG.DB_USER,
      database: CONFIG.DB_NAME,
      password: CONFIG.DB_PASSWORD,
      port: parseInt(CONFIG.DB_PORT, 10),
      host: CONFIG.DB_HOST,
      min: parseInt(CONFIG.DB_MIN_POOL, 10),
      max: parseInt(CONFIG.DB_MAX_POOL, 10),
      connectionTimeoutMillis: parseInt(CONFIG.DB_CONNECTION_TIMEOUT_MILLIS, 10),
      idleTimeoutMillis: parseInt(CONFIG.DB_IDLE_TIMEOUT_MILLIS, 10),
    };
    this.#client = null;
  }

  /**
   * @returns {import('pg').PoolClient} pg connection pool
   */
  async getClient() {
    if (!this.#client) {
      return this.#create();
    }

    return this.#client;
  }

  async release() {
    if (this.#client) {
      await this.#client.release(true);

      logger.info({
        event: 'PGConnection.createConnection',
        details: 'CONNECTION RELEASED',
      });
      return true;
    }
    return false;
  }

  /**
   * @param {String} query - Query to be executed by pg
   * @example 'SELECT * FROM schema.table WHERE id=$1 AND name=$2 AND created_at=$3'
   * @param {Array} values - List of params to use on query
   * @example ['1', 'foo', '2022-01-04']
   * @returns {Array} Database recovered data
   */
  async execute(query, values) {
    logger.info({
      event: 'PGConnection.execute',
      details: 'EXECUTING QUERY',
      query,
      values,
    });

    const client = await this.getClient();
    const { rowCount, rows, oid } = await client.query(query, values);

    logger.info({
      event: 'PGConnection.createConnection',
      details: 'DATABASE DATA RECOVERED ',
      data: { rowCount, oid },
    });

    return rows;
  }

  /**
   * @returns {import('pg').PoolClient} pg PoolClient
   */
  async #create() {
    logger.info({
      event: 'PGConnection.createConnection',
      details: 'CREATE DATABASE CONNECTION',
    });

    return new Pool(this.#options).connect();
  }
}

export default new PGConnection();
