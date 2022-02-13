import CONSTANTS from '../commons/constants.mjs';

const { SQL_BUILDER } = CONSTANTS;

class FluentSelectBuilder {
  #connection;

  #options;

  #select = SQL_BUILDER.ALL_FIELD;

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

  select(fields = []) {
    this.#select = fields;

    return this;
  }

  join(query) {
    const [[tableName, tableKey], [relationalTableName, relationalTableKey]] = Object.entries(query);
    this.#join.push({
      table: { name: tableName, field: tableKey },
      relationalTable: { name: relationalTableName, field: relationalTableKey },
    });

    return this;
  }

  where(query) {
    const [[field, value]] = Object.entries(query);
    this.#where.push({ field, value });

    return this;
  }

  build() {
    const select = 'SELECT ';
    let join = 'JOIN ';
    let where = ' WHERE ';
    const from = `FROM ${this.#options.schema}.${this.#options.table} `;
    const params = [];

    if (Array.isArray(this.#select)) {
      select.concat(this.#select.join(','));
      this.#query.concat(select).concat(from);
    } else {
      this.#query.concat(select).concat(from);
    }

    for (const { table, relationalTable } of this.#join) {
      if (typeof table === 'object' && typeof relationalTable === 'object') {
        const { name: tableName, field: tableField } = table;
        const { name: relationalTableName, field: relationalTableField } = relationalTable;

        join = join
          .concat(`${this.#options.schema}.${table.name} `)
          .concat(
            `ON ${this.#options.schema}.${tableName}.${tableField} = ${
              this.#options.schema
            }.${relationalTableName}.${relationalTableField} `,
          );
        this.#query.concat(join);
      }
    }

    if (this.#where.length > 0) {
      where = where.concat(this.#where.map(({ field }, idx) => `${field} = $${idx + 1}`).join(' AND '));
      params.push(...Object.values(this.#where));
      this.#query.concat(where);

      // TODO: REVISAR CONCATS E OS OUTROS FLUENTS
    }

    this.#query.concat('RETURNING *');

    const { rows } = this.#connection.query(this.#query, params);

    return rows;
  }
}

module.exports = FluentSelectBuilder;
