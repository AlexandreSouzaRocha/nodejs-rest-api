module.exports.constants = {
	BASE_PATH: '/v1',
	HTTP: {
		STATUS: {
			BAD_REQUEST: 400,
			UNAUTHORIZED: 401,
			FORBIDDEN: 403,
			NOT_FOUND: 404,
			CONFLICT: 409,
			SERVER_ERROR: 500,
		},
	},
	DATE: {
		ISO8601: 'yyyy-MM-dd[T]HH:mm:ss.SSS',
		SAO_PAULO_TZ: 'America/Sao_Paulo',
	},
	SQL_BUILDER: {
		ALL_FIELD: '*',
		BLANK_QUERY: '',
		SELECT_DEFAULT_LENGTH: 1,
		INSTANCE_TYPE: {
			SELECT: 'SELECT',
			UPDATE: 'UPDATE',
			INSERT: 'INSERT',
			DELETE: 'DELETE',
		},
	},
	YUP: {
		CONFIG: {
			strict: true,
			abortEarly: false,
			stripUnknown: true,
			recursive: true,
		},
		VALIDATIONS: {
			NAME: {
				MIN: 10,
				MAX: 128,
			},
			CPF: {
				MIN: 11,
				MAX: 11,
			},
			ZIP_CODE: {
				MIN: 8,
				MAX: 8,
			},
			PHONE: {
				MIN: 8,
				MAX: 11,
			},
		},
	},
	REGEX: {
		NAME: /[A-Z][a-zA-Z][^#&<>\\"~;$^%{}?]{1,128}$/,
		PHONE: /^[0-9]{8,11}$/,
		ZIP_CODE: /^[0-9]{8,8}$/,
		UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
		CPF: /^[0-9]{11,11}/,
		RG: /^[0-9]{9,9}/,
		NUMBER: /^[0-9]{1,14}/,
	},
	EXCEPTIONS: {
		VALIDATION: 'ValidationException',
	},
	MESSAGES: {
		INVALID: {
			NAME:
				'The field {} is null or invalid. It only accepts a {} with MAX length of 128 characters.',
			DATE: 'The field {} is null or invalid. It only accepts a date on format YYYY-MM-DD.',
			RG:
				'The field rg is null or invalid. It only accepts a valid RG with MAX length of 9 characters.',
			CPF:
				'The field cpf is null or invalid. It only accepts a valid CPF with MAX length of 11 characters.',
			ADDRESS:
				'The field address is null or invalid. It only accepts a valid address with MAX len of 128 characters.',
			ZIP_CODE:
				'The field zipCode is null or invalid. It only accepts a valid zipCode with MAX length of 8 characters.',
			COUNTRY: 'The field country is null or invalid. It only accepts a existing country.',
			PHONE:
				'The field {} is null or invalid. It only accepts a valid {} with MAx len of 11 characters.',
			UNIQUE_ID: 'The uniqueId {} is null or invalid. It only accepts a valid uniqueId.',
			FILTER:
				'The filter {} is invalid for query. It only accepts [cpf, rg, uniqueId, enrollmentDate, scholling, candidateStatus, candidateName, page, limit]',
			ENROLLMENT_DATE: `The filter enrollmentDate is null or invalid. It only accepts a date on format YYYY-MM-DDThh:mm:ss`,
			CANDIDATE_STATUS:
				'The candidateStatus {} is null or invalid. It only accepts [APPROVED, DISAPPROVED, DELETED or PENDING]',
			PAGEABLE_PARAM:
				'The param {} is null or invalid. It only accepts positives numbers greather than 0 with MAX len of 14 characters',
		},
		DEFUALT: {
			BAD_REQUEST: 'The attributes of the request is null or invalid.',
			DATABASE_ERROR: 'Internal error while executing query on database.',
			SERVER_ERROR: 'Internal server error while executing request.',
		},
		CANDIDATE_EXISTS: 'The candidate {} alredy exists.',
		CANDIDATE_NOT_FOUND: 'The candidate {} was not found.',
		CANDIDATE_DELETED: 'The candidate {} has been deleted sucessfully.',
		CANDIDATE_UPDATED: 'The candidate has been updated sucessfully.',
		CANDIDATE_ALREADY_DELETED: 'The candidate {} has been already deleted.',
	},
	STATUS: {
		APPROVED: 'APPROVED',
		DELETED: 'DELETED',
		DISAPPROVED: 'DISAPPROVED',
		PENDING: 'PENDING',
	},
};
