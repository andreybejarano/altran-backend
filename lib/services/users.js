'use strict';

const config = require('../config');
const request = require('request-promise');

class UsersService {
	constructor(options) {
		this.url = options ? options.endpoints : config.endpoints.users;
	}

	/**
	 * Get all users
	 * @returns {Promise} Resolve promise with all users data or Reject with error
	 */
	async getUsers() {
		let options = {
			method: 'GET',
			uri: this.url,
			json: true
		};

		try {
			let users = await request(options);
			return Promise.resolve(users);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}

	/**
	 * Get user data by Id
	 * @param {String} id 
	 * @returns {Promise} Resolve promise with user data or reject with error
	 */
	async getUserById(id) {
		try {
			let users = await this.getUsers();
			let user = users.clients.find(user => { return user.id === id; });
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}

	/**
	 * Get user data by unser name
	 * @param {String} name 
	 * @returns {Promise} Resolve Promise with user data or reject with error
	 */
	async getUserByName(name) {
		try {
			let users = await this.getUsers();
			let user = users.clients.find(user => { return user.name === name; });
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}
}

module.exports = UsersService;
