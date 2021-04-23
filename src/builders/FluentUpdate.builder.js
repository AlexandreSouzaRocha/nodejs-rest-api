class FluentUpdateBuilder {
	#connection;

	#options;

	#update = [];

	#where = [];

	constructor({ connection, options }) {
		this.#connection = connection;
		this.#options = options;
	}

	static withConnection({ connection, options }) {
		return new FluentUpdateBuilder({ connection, options });
	}
}

module.exports = FluentUpdateBuilder;
