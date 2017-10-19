'use strict';
const test = require('ava');
const request = require('request-promise');
const config = require('../lib/config');
const Utils = require('../lib/utils');

test.beforeEach(async t => {
	t.context.userAdmin = await Utils.signToken({name: 'Britney', email: 'britneyblankenship@quotezart.com'}, config.secret);
	t.context.userUser = await Utils.signToken({name: 'Merrill', email: 'merrillblankenship@quotezart.com'}, config.secret);
});

test('GET /users/:id', async t => {
	let options = {
		method: 'GET',
		uri: `http://localhost:${config.port}/users/a0ece5db-cd14-4f21-812f-966633e7be86`,
		json: true,
		headers: {
			'Authorization': t.context.userAdmin
		}
	};

	let user = await request(options);
	t.is(typeof user, 'object');
});

test('GET /users?name=:name', async t => {
	let options = {
		method: 'GET',
		uri: `http://localhost:${config.port}/users?name=Britney`,
		json: true,
		headers: {
			'Authorization': t.context.userUser
		}
	};

	let user = await request(options);
	t.is(typeof user, 'object');
});
