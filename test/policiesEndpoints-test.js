'use strict';
const test = require('ava');
const request = require('request-promise');
const config = require('../lib/config');
const Utils = require('../lib/utils');

test.beforeEach(async t => {
	t.context.userAdmin = await Utils.signToken({ name: 'Britney', email: 'britneyblankenship@quotezart.com' }, config.secret);
	t.context.userUser = await Utils.signToken({ name: 'Merrill', email: 'merrillblankenship@quotezart.com' }, config.secret);
});

test('GET /policies?username=:username', async t => {
	let options = {
		method: 'GET',
		uri: `http://localhost:${config.port}/policies?username=Britney`,
		json: true,
		headers: {
			'Authorization': t.context.userAdmin
		}
	};

	let user = await request(options);
	t.is(typeof user, 'object');
});

test('GET /policies/:id/user', async t => {
	let options = {
		method: 'GET',
		uri: `http://localhost:${config.port}/policies/64cceef9-3a01-49ae-a23b-3761b604800b/user`,
		json: true,
		headers: {
			'Authorization': t.context.userAdmin
		}
	};

	let user = await request(options);
	t.is(typeof user, 'object');
});
