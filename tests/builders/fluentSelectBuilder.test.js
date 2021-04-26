const { createSandbox } = require('sinon');
const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');
const { v4: uuidV4 } = require('uuid');
const Logger = require('../../src/utils/Logger');
const FluentSelectBuilder = require('../../src/builders/FluentSelect.builder');
const PGConnection = require('../../src/database/PGConnection');
const FluentSQLBuilderFacade = require('../../src/facade/FluentSQLBuilderFacade');

describe('#Test Suite for FluentSelectBuilder', () => {
	let sandbox;
	let connection;
	let logger;
	let options;

	beforeEach(async () => {
		options = {
			requestId: uuidV4(),
		};
		sandbox = createSandbox();
		logger = new Logger({ options }).createLogger();
		connection = await new PGConnection({ logger }).createConnection();
	});

	afterEach(() => {
		sandbox.restore();
		PGConnection.closeConnection(connection);
	});

	it('Should be return a FluentSelectBuilder object instance');
	it('Should be return a FluentSelectBuilder empty object instance');
});
