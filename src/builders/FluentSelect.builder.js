const { constants } = require('../utils/constants');

const { SQL_BUILDER } = constants;

class FluentSelectBuilder {
	#connection;

	#options;

	#select = [SQL_BUILDER.ALL_FIELD];

	#join = [];

	#where = [];

	#query;

	constructor({ connection, options }) {
		this.#connection = connection;
		this.#options = options;
		this.#query = SQL_BUILDER.BLANK_QUERY;
	}

	static withConnection({ connection, options }) {
		return new FluentSelectBuilder({ connection, options });
	}

	select(fields) {
		this.#select = fields;

		return this;
	}

	join(query) {
		const [[table, relationalTable]] = Object.entries(query);
		this.#join.push({ table, relationalTable });

		return this;
	}

	where(query) {
		const [[field, value]] = Object.entries(query);
		this.#where.push({ field, value });

		return this;
	}

	build() {
		const select = 'SELECT ';
		const join = 'JOIN ';
		const from = `FROM ${this.#options.schema}.${this.#options.table} `;
		const where = 'WHERE ';
		const params = [];

		if (this.#select.length > SQL_BUILDER.SELECT_DEFAULT_LENGTH) {
			select.concat(this.#select.join(','));
			this.#query.concat(select).concat(from);
		} else {
			this.#query.concat(select).concat(from);
		}

		for (const { table, relationalTable } of this.#join) {
			if (typeof table === 'object' && typeof relationalTable === 'object') {
				const { name: tableName, field: tableField } = table;
				const { name: relationalTableName, field: relationalTableField } = relationalTable;

				join.concat(`${this.#options.schema}.${table.name} `).concat(
					`ON ${this.#options.schema}.${tableName}.${tableField} = ${
						this.#options.schema
					}.${relationalTableName}.${relationalTableField} `,
				);
				this.#query.concat(join);
			}
		}

		if (this.#where.length > 0) {
			where.concat(this.#where.map(({ field }, idx) => `${field} = $${idx + 1}`).join(','));
			this.#where.forEach(({ value }) => params.push(`${value}`));
		}

		this.#query.concat('RETURNING *');

		const { rows } = this.#connection.query(this.#query, params);

		return rows;
	}
}

module.exports = FluentSelectBuilder;
