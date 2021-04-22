const express = require('express');

class Routes {
	router;

	constructor() {
		this.router = express.Router();
	}

	configureRoutes() {
		this.router.post('/enrollment', (req, res) => {
			req.logger.info({ event: 'TEST', logging: req.headers });
			return res.json({ status: 'UP', timestamp: new Date().toISOString() });
		});

		return this.router;
	}
}

module.exports = Routes;
