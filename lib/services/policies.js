'use strict';

const config = require('../config');
const UsersService = require('./users');
const request = require('request-promise');

class PoliciesService {
	constructor(options) {
		this.url = options ? options.endpoints : config.endpoints.policies;
	}

	/**
	 * Get all policies
	 * @returns {Promise} Resolve all policies data 
	 */
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

	/**
	 * Get Policies data liked to a user name 
	 * @param {String} username 
	 * @description Returns policies liked to a user
	 * @returns {Promise} Resolve promise with data of policies liked to user name or Reject error
	 */
	async getPoliciesByUsername(username) {
		try {
			let policies = await this.getPolicies();
			let userService = new UsersService();
			let user = await userService.getUserByName(username) || {};
			let policiesUser = policies.policies.filter(policy => { return policy.clientId === user.id; });
			return Promise.resolve(policiesUser);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}

	/**
	 * Get user data liked to a policy id
	 * @param {String} id Policy id
	 * @description Return user data filtered to a id policy
	 * @returns {Promise} Resolve promise with user data or Reject error
	 */
	async getUserByPolicyId(id) {
		try {
			let policies = await this.getPolicies();
			let policy = policies.policies.find(policy => { return policy.id === id; }) || {};
			let userService = new UsersService();
			let user = await userService.getUserById(policy.clientId);
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}
}

module.exports = PoliciesService;
