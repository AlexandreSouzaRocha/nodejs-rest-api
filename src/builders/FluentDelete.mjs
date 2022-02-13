import CONSTANTS from '../commons/constants.mjs';

const { SQL_BUILDER } = CONSTANTS;

class FluentDeleteBuilder {
  #connection;

  #options;

  #query;

  #delete = [];

  #where = [];

  constructor({ connection, options }) {
    this.#options = options;
    this.#connection = connection;
    this.#query = SQL_BUILDER.BLANK_QUERY;
  }

  static withConnection({ connection, options }) {
    return new FluentDeleteBuilder({ connection, options });
  }

  delete(fields) {
    this.#delete = fields;

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

module.exports = FluentDeleteBuilder;
