const FluentSelectBuilder = require('../builders/FluentSelect.builder');
const FluentUpdateBuilder = require('../builders/FluentUpdate.builder');
const FluentInsertBuilder = require('../builders/FluentInsert.builder');
const FluentDeleteBuilder = require('../builders/FluentDelete.builder');

class FluentSQLBuilderFacade {
	#type;

	#connection;

	#options;

	constructor({ type, connection, options }) {
		this.#type = type;
		this.#connection = connection;
		this.#options = options;
	}

	static withInstanceType({ type, connection, options }) {
		return new FluentSQLBuilderFacade({ type, connection, options });
	}

	build() {
		const buildParams = {
			connection: this.#connection,
			options: this.#options,
		};

		const instance = {
			SELECT: FluentSelectBuilder.withConnection(buildParams),
			UPDATE: FluentUpdateBuilder.withConnection(buildParams),
			INSERT: FluentInsertBuilder.withConnection(buildParams),
			DELETE: FluentDeleteBuilder.withConnection(buildParams),
		};

		return instance[this.#type];
	}
}

module.exports = FluentSQLBuilderFacade;
