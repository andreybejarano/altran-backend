'use strict';

const config = require('../config');

class PoliciesService {
	constructor(options) {
		const url = options.endpoints || config.endpoints.users;
	}
}

module.exports = PoliciesService;