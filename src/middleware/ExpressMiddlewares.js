/* eslint-disable class-methods-use-this */
const uuid = require('uuid');
const express = require('express');
const cors = require('cors');
const Logger = require('../utils/Logger');
const { constants } = require('../utils/constants');
const Routes = require('../routes');

class ExpressMiddlewares {
	logger;

	constructor({ app }) {
		this.app = app;
		this.router = new Routes();
	}

	setupLoggingMiddleware() {
		this.app.use(this.loggingMiddleware);
	}

	setupBodyParserMiddleware() {
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
	}

	setupRequestMiddleware() {
		this.app.use(cors());
	}

	async setupRoutesMiddleware() {
		this.app.use(constants.BASE_PATH, this.router.configureRoutes());
	}

	async loggingMiddleware(request, _response, next) {
		const requestId = request.headers['x-request-id'] || uuid.v4();
		const logger = new Logger({ options: { requestId } });

		request.logger = logger.createLogger();
		next();
	}
}

module.exports = ExpressMiddlewares;
