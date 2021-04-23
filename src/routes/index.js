const express = require('express');

class Routes {
	router;

	constructor() {
		this.router = express.Router();
	}

	configureRoutes() {
		this.router.post('/developer/enrollment', (req, res) => {
			req.logger.info({ event: 'TEST', logging: req.headers });
			return res.json({ status: 'UP', timestamp: new Date().toISOString() });
		});
		this.router.get('/health', (req, res) => {
			req.logger.info({ event: 'TEST', logging: req.headers });
			return res.json({ status: 'UP', timestamp: new Date().toISOString() });
		});
		this.router.get('/developer/:uniqueId', (req, res) => {
			req.logger.info({ event: 'TEST', logging: req.headers });
			return res.json({ status: 'UP', timestamp: new Date().toISOString() });
		});
		this.router.get('/developer/:documentNumber', (req, res) => {
			req.logger.info({ event: 'TEST', logging: req.headers });
			return res.json({ status: 'UP', timestamp: new Date().toISOString() });
		});
		this.router.post('/developer', (req, res) => {
			req.logger.info({ event: 'TEST', logging: req.headers });
			return res.json({ status: 'UP', timestamp: new Date().toISOString() });
		});
		this.router.get('/developers', (req, res) => {
			req.logger.info({ event: 'TEST', logging: req.headers });
			return res.json({ status: 'UP', timestamp: new Date().toISOString() });
		});
		this.router.delete('/developer/:uniqueId', (req, res) => {
			req.logger.info({ event: 'TEST', logging: req.headers });
			return res.json({ status: 'UP', timestamp: new Date().toISOString() });
		});
		this.router.put('/developer', (req, res) => {
			req.logger.info({ event: 'TEST', logging: req.headers });
			return res.json({ status: 'UP', timestamp: new Date().toISOString() });
		});

		return this.router;
	}
}

module.exports = Routes;
