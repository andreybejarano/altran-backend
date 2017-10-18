'use strict';
const test = require('ava');
const request = require('request-promise');
const UsersService = require('../lib/services/users');
const config = require('../lib/config');

test.beforeEach(t => {
	t.context.usersService = new UsersService();
});

test('List all users', async t => {
	let usersService = t.context.usersService;
	t.is(typeof usersService.getUsers, 'function', 'getUsers is a function');
	let options = {
		method: 'GET',
		uri: config.endpoints.users,
		json: true
	};
	let users = await request(options);
	let result = await usersService.getUsers();
	t.deepEqual(users, result);
});

test('List user by id', async t => {
	let usersService = t.context.usersService;
	t.is(typeof usersService.getUserById, 'function', 'getUserById is a function');
	let options = {
		method: 'GET',
		uri: config.endpoints.users,
		json: true
	};
	let users = await request(options);
	let id = users.clients[0].id;
	let result = await usersService.getUserById(id);
	t.deepEqual(users.clients[0], result);
});

test('List user by name', async t => {
	let usersService = t.context.usersService;
	t.is(typeof usersService.getUserByName, 'function', 'getUserByName is a function');
	let options = {
		method: 'GET',
		uri: config.endpoints.users,
		json: true
	};
	let users = await request(options);
	let name = users.clients[0].name;
	let result = await usersService.getUserByName(name);
	t.deepEqual(users.clients[0], result);
});
