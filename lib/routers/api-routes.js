'use strict';

const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const PoliciesController = require('../controllers/policies');

router.get('/users/:id', UsersController.getUserById);
router.get('/users/name/:name', UsersController.getUserByName);
router.get('/policies/username/:username', PoliciesController.getPoliciesByUsername);
router.get('/policies/:id/user', PoliciesController.getUserByPolicyId);

module.exports = router;
