'use strict';

const config = require('../config');

class UsersService {
	constructor(options) {
		const url = options.endpoints || config.endpoints.users;
	}
}

module.exports = UsersService;