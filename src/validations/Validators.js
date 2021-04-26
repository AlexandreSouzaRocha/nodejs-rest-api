const { object, string, date } = require('yup');
const YUPConfig = require('./YUP.config');
const { constants } = require('../utils/constants');
const Commons = require('../utils/Commons');

const { REGEX, YUP, MESSAGES, STATUS } = constants;

class Validators {
	#logger;

	#yupConfig;

	constructor({ logger }) {
		this.#logger = logger;
		this.#yupConfig = new YUPConfig({ logger });
	}

	async validateDevelopersRequestBody({ requestBody }) {
		try {
			this.#logger.info({
				event: 'Validators.validateDevelopersRequestBody',
				requestBody,
			});

			const yupSchema = object().shape({
				candidateName: string()
					.required()
					.matches(REGEX.NAME)
					.min(YUP.VALIDATIONS.NAME.MIN)
					.max(YUP.VALIDATIONS.NAME.MAX)
					.typeError(MESSAGES.INVALID.NAME.replace('{}', 'candidateName')),
				birthDate: date()
					.strict()
					.required()
					.typeError(MESSAGES.INVALID.DATE.replace('{}', 'birthDate')),
				cpf: string()
					.required()
					.matches(REGEX.CPF)
					.min(YUP.VALIDATIONS.CPF.MIN)
					.max(YUP.VALIDATIONS.CPF.MAX)
					.typeError(MESSAGES.INVALID.CPF),
				motherName: string()
					.required()
					.matches(REGEX.NAME)
					.min(YUP.VALIDATIONS.NAME.MIN)
					.max(YUP.VALIDATIONS.NAME.MAX)
					.typeError(MESSAGES.INVALID.NAME.replace('{}', 'motherName')),
				fatherName: string()
					.required()
					.matches(REGEX.NAME)
					.min(YUP.VALIDATIONS.NAME.MIN)
					.max(YUP.VALIDATIONS.NAME.MAX)
					.typeError(MESSAGES.INVALID.NAME.replace('{}', 'fatherName')),
				neighborhood: string()
					.required()
					.matches(REGEX.NAME)
					.min(YUP.VALIDATIONS.NAME.MIN)
					.max(YUP.VALIDATIONS.NAME.MAX)
					.typeError(MESSAGES.INVALID.NAME.replace('{}', 'neighborhood')),
				address: string()
					.required()
					.matches(REGEX.NAME)
					.min(YUP.VALIDATIONS.NAME.MIN)
					.max(YUP.VALIDATIONS.NAME.MAX)
					.typeError(MESSAGES.INVALID.NAME.replace('{}', 'address')),
				zipCode: string()
					.required()
					.strict()
					.matches(REGEX.ZIP_CODE)
					.min(YUP.VALIDATIONS.ZIP_CODE.MIN)
					.max(YUP.VALIDATIONS.ZIP_CODE.MAX)
					.typeError(MESSAGES.INVALID.ZIP_CODE),
				country: string()
					.required()
					.matches(REGEX.NAME)
					.min(YUP.VALIDATIONS.NAME.MIN)
					.max(YUP.VALIDATIONS.NAME.MAX)
					.typeError(MESSAGES.INVALID.NAME.replace('{}', 'country')),
				mobileNumber: string()
					.required()
					.strict()
					.matches(REGEX.PHONE)
					.min(YUP.VALIDATIONS.PHONE.MIN)
					.max(YUP.VALIDATIONS.PHONE.MAX)
					.typeError(MESSAGES.INVALID.PHONE.replace('{}', 'mobileNumber')),
				phoneNumber: string()
					.required()
					.strict()
					.matches(REGEX.PHONE)
					.min(YUP.VALIDATIONS.PHONE.MIN)
					.max(YUP.VALIDATIONS.PHONE.MAX)
					.typeError(MESSAGES.INVALID.PHONE.replace('{}', 'phoneNumber')),
				candidateStatus: string().optional().strict().default(STATUS.PENDING),
				enrollmentDate: string()
					.optional()
					.strict()
					.default(Commons.getLocaleDate())
					.typeError(MESSAGES.INVALID.ENROLLMENT_DATE.replace('{}', 'candidateStatus')),
			});

			const validatedBody = await this.#yupConfig.validate(yupSchema, requestBody);

			this.#logger.info({
				event: 'Validators.validateDevelopersRequestBody',
				validatedBody,
			});

			return validatedBody;
		} catch (error) {
			const { errorList, exceptionType } = error;

			this.#logger.error({
				event: 'Validators.validateDevelopersRequestBody',
				errorList,
				exceptionType,
			});

			throw error;
		}
	}
}

module.exports = Validators;
