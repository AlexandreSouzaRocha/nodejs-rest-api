/* eslint-disable no-console */
const { app } = require('./App');
const { env } = require('./src/env');

app.listen(env.APP_PORT, () => {
	console.log(`[SERVER]: Connected on 0.0.0.0:${env.APP_PORT}`);
});
