'use strict';

const PoliciesService = require('../services/policies');
const service = new PoliciesService();
const Auth = require('../services/auth');
const authenticate = new Auth();

class PoliciesController {
	static async getPoliciesByUsername(req, res) {
		try {
			if (await authenticate.authorization(req.headers.authorization, 'policies')) {
				let policies = await service.getPoliciesByUsername(req.query.username);
				if (policies.length < 1) {
					res.status(404).json({ message: 'Policies not found' });
				} else {
					res.json(policies);
				}
			} else {
				res.status(401).json({ message: 'Access denied' });
			}
		} catch (error) {
			res.status(500).json({ message: error.message, stack: error.stack });
		}
	}

	static async getUserByPolicyId(req, res) {
		try {
			if (await authenticate.authorization(req.headers.authorization, 'policies')) {
				let user = await service.getUserByPolicyId(req.params.id);
				if (!user) {
					res.status(404).json({ message: 'Policy id not found' });
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

module.exports = PoliciesController;
