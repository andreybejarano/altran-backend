'use strict';

const config = require('../config');
const request = require('request-promise');

class UsersService {
	constructor(options) {
		this.url = options ? options.endpoints : config.endpoints.users;
	}

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

	async getUserById(id) {
		try {
			let users = await this.getUsers();
			let user = users.clients.find(user => { return user.id === id; });
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}

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
