class FluentInsertBuilder {
	#connection;

	#options;

	#insert = [];

	#where = [];

	constructor({ connection, options }) {
		this.#connection = connection;
		this.#options = options;
	}

	static withConnection({ connection, options }) {
		return new FluentInsertBuilder({ connection, options });
	}
}

module.exports = FluentInsertBuilder;
