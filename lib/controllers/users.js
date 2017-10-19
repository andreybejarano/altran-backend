'use strict';

const UsersService = require('../services/users');
const service = new UsersService();
const Auth = require('../services/auth');
const authenticate = new Auth();

class UsersController {
	static async getUserById(req, res) {
		try {
			if (await authenticate.authorization(req.headers.authorization, 'users')) {
				let user = await service.getUserById(req.params.id);
				if (!user) {
					res.status(404).json({ message: 'User not found' });
				} else {
					res.json(user);
				}
			} else {
				res.status(401).json({ message: 'Access denied' });
			}
		} catch (error) {
			res.status(500).json({ message: error.message, stack: error.stack });
		}
	}

	static async getUserByName(req, res) {
		try {
			if (await authenticate.authorization(req.headers.authorization, 'users')) {
				let user = await service.getUserByName(req.query.name);
				if (!user) {
					res.status(404).json({ message: 'User not found' });
				} else {
					res.json(user);
				}
			} else {
				res.status(401).json({ message: 'Access denied' });
			}
		} catch (error) {
			res.status(500).json({ message: error.message, stack: error.stack });
		}
	}
}

module.exports = UsersController;
