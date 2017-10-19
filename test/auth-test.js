'use strict';
const test = require('ava');
const Utils = require('../lib/utils');
const UsersService = require('../lib/services/users');
const AuthService = require('../lib/services/auth');
const config = require('../lib/config');

test.beforeEach(t => {
	t.context.usersService = new UsersService();
	t.context.authService = new AuthService();
});

test('authentication decode json web token with user information', async t => {
	const usersService = t.context.usersService;
	const authService = t.context.authService;
	t.is(typeof authService.authentication, 'function', 'authentication is a function');
	const user = await usersService.getUserByName('Britney');
	const userToken = await Utils.signToken({ name: user.name, email: user.email }, config.secret);

	let userDecoded = await authService.authentication(userToken);
	t.is(userDecoded.name, user.name);
});

test('Permissions of user', async t => {
	const usersService = t.context.usersService;
	const authService = t.context.authService;
	t.is(typeof authService.permissions, 'function', 'permissions is a function');
	const user = await usersService.getUserByName('Britney');
	const userToken = await Utils.signToken({ name: user.name, email: user.email }, config.secret);

	let permissions = await authService.permissions(userToken);
	t.deepEqual(permissions, config.permissions[user.role]);
});

test('Authorization for endpoints of users', async t => {
	const usersService = t.context.usersService;
	const authService = t.context.authService;
	t.is(typeof authService.authorization, 'function', 'authorization is a function');
	const user = await usersService.getUserByName('Britney');
	const userToken = await Utils.signToken({ name: user.name, email: user.email }, config.secret);

	let authorization = await authService.authorization(userToken, 'users');
	t.is(authorization, config.permissions[user.role].some(permission => { return permission === 'users'; }));
});
