class FluentDeleteBuilder {
	#connection;

	#options;

	#delete;

	where;

	constructor({ connection, options }) {
		this.#options = options;
		this.#connection = connection;
	}

	static withConnection({ connection, options }) {
		return new FluentDeleteBuilder({ connection, options });
	}
}

module.exports = FluentDeleteBuilder;
