const { constants } = require('../utils/constants');

const { SQL_BUILDER } = constants;

class FluentInsertBuilder {
	#connection;

	#options;

	#query;

	#insert = [];

	#values = [];

	constructor({ connection, options }) {
		this.#connection = connection;
		this.#options = options;
		this.#query = SQL_BUILDER.BLANK_QUERY;
	}

	static withConnection({ connection, options }) {
		return new FluentInsertBuilder({ connection, options });
	}

	insert(fields) {
		this.#insert = fields;

		return this;
	}

	values(params) {
		this.#values = params;

		return this;
	}

	build() {
		return this.#connection;
	}
}

module.exports = FluentInsertBuilder;
