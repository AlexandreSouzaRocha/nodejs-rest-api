const CandidateValidationException = require('../errors/CandidateValidationException');
const { constants } = require('../utils/constants');

const { HTTP, EXCEPTIONS } = constants;

class YUPConfig {
	#logger;

	constructor({ logger }) {
		this.#logger = logger;
	}

	async validate(schema, model) {
		try {
			this.#logger.info({ event: 'YUPConfig.validate', model });

			const result = await schema.validate(model);

			this.#logger.info({ event: 'YUPConfig.validate', shcemaValidated: result });

			return result;
		} catch (error) {
			const { errors, name } = error;

			this.#logger.error({ event: 'YUPConfig.validate', exceptionType: name, errors });

			throw new CandidateValidationException(
				HTTP.STATUS.BAD_REQUEST,
				errors,
				EXCEPTIONS.VALIDATION,
			);
		}
	}
}

module.exports = YUPConfig;
