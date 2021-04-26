const { createSandbox } = require('sinon');
const { describe, it, afterEach, beforeEach } = require('mocha');
const { expect } = require('chai');
const { v4: uuidV4 } = require('uuid');
const FluentSQLBuilderFacade = require('../../src/facade/FluentSQLBuilderFacade');
const PGConnection = require('../../src/database/PGConnection');
const Logger = require('../../src/utils/Logger');
const { constants } = require('../../src/utils/constants');
const FluentSelectBuilder = require('../../src/builders/FluentSelect.builder');
const FluentInsertBuilder = require('../../src/builders/FluentInsert.builder');
const FluentUpdateBuilder = require('../../src/builders/FluentUpdate.builder');
const FluentDeleteBuilder = require('../../src/builders/FluentDelete.builder');

describe('#Test Suite for Facade Builder', () => {
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

	it('#build should be return a FluentSelectBuilder object instance', () => {
		const { SELECT } = constants.SQL_BUILDER.INSTANCE_TYPE;
		const result = FluentSQLBuilderFacade.withInstanceType({
			type: SELECT,
			connection,
			options,
		}).build();

		const expectedResult = new FluentSelectBuilder({ connection, options });

		expect(result).to.be.deep.equal(expectedResult);
	});

	it('#build should be return a FluentInsertBuilder object instance', () => {
		const { INSERT } = constants.SQL_BUILDER.INSTANCE_TYPE;
		const result = FluentSQLBuilderFacade.withInstanceType({
			type: INSERT,
			connection,
			options,
		}).build();

		const expectedResult = new FluentInsertBuilder({ connection, options });

		expect(result).to.be.deep.equal(expectedResult);
	});

	it('#build should be return a FluentUpdateBuilder object instance', () => {
		const { UPDATE } = constants.SQL_BUILDER.INSTANCE_TYPE;
		const result = FluentSQLBuilderFacade.withInstanceType({
			type: UPDATE,
			connection,
			options,
		}).build();

		const expectedResult = new FluentUpdateBuilder({ connection, options });

		expect(result).to.be.deep.equal(expectedResult);
	});

	it('#build should be return a FluentDeleteBuilder object instance', () => {
		const { DELETE } = constants.SQL_BUILDER.INSTANCE_TYPE;
		const result = FluentSQLBuilderFacade.withInstanceType({
			type: DELETE,
			connection,
			options,
		}).build();

		const expectedResult = new FluentDeleteBuilder({ connection, options });

		expect(result).to.be.deep.equal(expectedResult);
	});
});
