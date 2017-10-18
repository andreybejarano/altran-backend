'use strict';
const test = require('ava');
const request = require('request-promise');
const UsersService = require('../lib/services/users');
const PoliciesService = require('../lib/services/policies');
const config = require('../lib/config');

test.beforeEach(async t => {
	t.context.policiesService = new PoliciesService();
	t.context.usersService = new UsersService();
	let users = await t.context.usersService.getUsers();
	t.context.clients = users.clients;
});

test('List all policies', async t => {
	let policiesService = t.context.policiesService;
	t.is(typeof policiesService.getPolicies, 'function', 'getPolicies is a function');
	let options = {
		method: 'GET',
		uri: config.endpoints.policies,
		json: true
	};
	let policies = await request(options);
	let result = await policiesService.getPolicies();
	t.deepEqual(policies, result);
});

test('List policies liked to a user name', async t => {
	let policiesService = t.context.policiesService;
	let user = t.context.clients[0];
	t.is(typeof policiesService.getPoliciesByUsername, 'function', 'getPoliciesByUsername is a function');
	let options = {
		method: 'GET',
		uri: config.endpoints.policies,
		json: true
	};
	let policies = await request(options);
	let policiesUser = policies.policies.filter(policie => { return policie.clientId === user.id; });
	let result = await policiesService.getPoliciesByUsername(user.name);
	t.deepEqual(policiesUser, result);
});

test('List user liked to a policy number', async t => {
	let policiesService = t.context.policiesService;
	t.is(typeof policiesService.getUserByPolicyId, 'function', 'getUserByPolicyId is a function');
	let options = {
		method: 'GET',
		uri: config.endpoints.policies,
		json: true
	};
	let policies = await request(options);
	let policie = policies.policies[0];
	let user = t.context.clients.find(user => { return user.id === policie.clientId; });
	let result = await policiesService.getUserByPolicyId(policie.id);
	t.deepEqual(user, result);
});
