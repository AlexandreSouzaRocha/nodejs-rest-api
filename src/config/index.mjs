import dotenv from 'dotenv';

dotenv.config();

export default {
  DB_USER: process.env.DB_USER || 'developer_user',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_PORT: process.env.DB_PORT || '5432',
  DB_MIN_POOL: process.env.DB_MIN_POOL || '1',
  DB_MAX_POOL: process.env.DB_MAX_POOL || '3',
  DB_PASSWORD: process.env.DB_PASSWORD || '$Z5a]m?6',
  DB_NAME: process.env.DB_NAME || 'microservices',
  DB_CONNECTION_TIMEOUT_MILLIS: process.env.DB_CONNECTION_TIMEOUT_MILLIS || '3000',
  DB_IDLE_TIMEOUT_MILLIS: process.env.DB_IDLE_TIMEOUT_MILLIS || '3000',
  ENV: process.env.ENV || 'dev',
  APP_PORT: process.env.APP_PORT || '3000',
};
