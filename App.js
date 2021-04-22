const express = require('express');
const Routes = require('./src/routes');
const ExpressMiddlewares = require('./src/middleware/ExpressMiddlewares');

class App {
	app;

	constructor() {
		this.app = express();
		this.router = new Routes();
		this.expressMiddleware = new ExpressMiddlewares({ app: this.app });
		this.initialize();
	}

	initialize() {
		this.expressMiddleware.setupLoggingMiddleware();
		this.expressMiddleware.setupBodyParserMiddleware();
		this.expressMiddleware.setupRoutesMiddleware();
	}
}

module.exports = new App();
