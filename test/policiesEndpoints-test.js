'use strict';
const test = require('ava');
const request = require('request-promise');
const config = require('../lib/config');

test('GET /policies?username=:username', async t => {
	let options = {
		method: 'GET',
		uri: `http://localhost:${config.port}/policies?username=Britney`,
		json: true
	};

	let user = await request(options);
	t.is(typeof user, 'object');
});

test('GET /policies/:id/user', async t => {
	let options = {
		method: 'GET',
		uri: `http://localhost:${config.port}/policies/64cceef9-3a01-49ae-a23b-3761b604800b/user`,
		json: true
	};

	let user = await request(options);
	t.is(typeof user, 'object');
});
