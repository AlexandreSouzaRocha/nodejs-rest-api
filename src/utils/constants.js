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
};
