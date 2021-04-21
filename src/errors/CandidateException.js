class CandidateException extends Error {
	constructor({ statusCode, errors, exceptionType }) {
		super(exceptionType);
		this.statusCode = statusCode;
		this.errors = errors;
		this.exceptionType = exceptionType;
	}
}

module.exports = CandidateException;
