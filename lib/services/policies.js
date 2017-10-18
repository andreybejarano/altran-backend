'use strict';

const config = require('../config');
const UsersService = require('./users');
const request = require('request-promise');

class PoliciesService {
	constructor(options) {
		this.url = options ? options.endpoints : config.endpoints.policies;
	}

	async getPolicies() {
		let options = {
			method: 'GET',
			uri: this.url,
			json: true
		};

		try {
			let policies = await request(options);
			return Promise.resolve(policies);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}

	async getPoliciesByUsername(username) {
		try {
			let policies = await this.getPolicies();
			let userService = new UsersService();
			let user = await userService.getUserByName(username);
			let policiesUser = policies.policies.filter(policy => { return policy.clientId === user.id; });
			return Promise.resolve(policiesUser);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}

	async getUserByPolicyId(id) {
		try {
			let policies = await this.getPolicies();
			let policy = policies.policies.find(policy => { return policy.id === id; });
			let userService = new UsersService();
			let user = await userService.getUserById(policy.clientId);
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}
}

module.exports = PoliciesService;
