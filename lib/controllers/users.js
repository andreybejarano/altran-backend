'use strict';

const UsersService = require('../services/users');
const service = new UsersService();

class UsersController {
	static async getUserById(req, res) {
		try {
			let user = await service.getUserById(req.params.id);
			if (!user) {
				res.status(404).json({message: 'User not found'});
			} else {
				res.json(user);
			}
		} catch (error) {
			res.status(500).json({message: error.message, stack: error.stack});
		}
	}

	static async getUserByName(req, res) {
		try {
			let user = await service.getUserByName(req.query.name);
			if (!user) {
				res.status(404).json({message: 'User not found'});
			} else {
				res.json(user);
			}
		} catch (error) {
			res.status(500).json({message: error.message, stack: error.stack});
		}
	}
}

module.exports = UsersController;
