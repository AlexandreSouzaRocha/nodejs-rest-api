import CONSTANTS from '../commons/constants.mjs';

const { SQL_BUILDER } = CONSTANTS;

class FluentUpdateBuilder {
  #connection;

  #options;

  #query;

  #update = [];

  #where = [];

  constructor({ connection, options }) {
    this.#connection = connection;
    this.#options = options;
    this.#query = SQL_BUILDER.BLANK_QUERY;
  }

  static withConnection({ connection, options }) {
    return new FluentUpdateBuilder({ connection, options });
  }

  update(fields) {
    this.#update = fields;

    return this;
  }

  where(query) {
    this.#where = query;

    return this;
  }

  build() {
    return this.#connection;
  }
}

module.exports = FluentUpdateBuilder;
