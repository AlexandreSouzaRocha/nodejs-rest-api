class CandidateValidationException extends Error {
	constructor({ statusCode, errors, exceptionType }) {
		super(exceptionType);
		this.statusCode = statusCode;
		this.errorsList = errors;
		this.exceptionType = exceptionType;
	}
}

module.exports = CandidateValidationException;
