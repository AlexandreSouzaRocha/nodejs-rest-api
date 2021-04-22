const { createSandbox } = require('sinon');
const { describe, it, afterEach, beforeEach } = require('mocha');
const { expect } = require('chai');

describe('#developer', () => {
	let sandbox;

	beforeEach(() => {
		sandbox = createSandbox();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('Should be enroll a developer', () => {
		expect(true).to.be.true.equal(true);
	});
});
