const {
	createLogger,
	format: { combine, timestamp, printf, json },
	transports,
} = require('winston');

class Logger {
	#logger;

	constructor({ options }) {
		this.#logger = options;
	}

	createLogger() {
		const { requestId } = this.#logger;
		const customFormat = printf(({ message, level, timestamp: loggingDate }) => {
			const logging = {
				level,
				requestId,
				message,
				timestamp: loggingDate,
			};

			return `[${level.toUpperCase()}]: ${JSON.stringify(logging)}`;
		});

		return createLogger({
			format: combine(json(), timestamp(), customFormat),
			transports: [new transports.Console()],
		});
	}
}

module.exports = Logger;
