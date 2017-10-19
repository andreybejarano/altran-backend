'use strict';

const Utils = require('../utils');
const UsersService = require('./users');
const config = require('../config');
const userService = new UsersService();

/**
 * @class AuthService
 */
class AuthService {
	/**
	 * Authentication
	 * @param {String} token
	 * @description this method decode json web token and return data of user
	 * @returns {Promise} Resolve user data or reject error
	 */
	async authentication(token) {
		try {
			const tokenDecoded = await Utils.verifyToken(token, config.secret);
			const user = await userService.getUserByName(tokenDecoded.name);
			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}

	/**
	 * Permissions
	 * @param {String} token Json web token with user data for authentication
	 * @description this method return permissions of rol
	 * @return {Promise} resolve with permissions data or reject error  
	 */
	async permissions(token) {
		try {
			const userAuthenticated = await this.authentication(token) || {};
			const permissions = config.permissions[userAuthenticated.role] || [];
			return Promise.resolve(permissions);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}

	/**
	 * Authorization
	 * @param {String} header header with json web token
	 * @param {String} accessTo query for return true or false if permission authorised 
	 * @description 
	 * @returns {Promise} return true or false 
	 */
	async authorization(header, accessTo) {
		if (!header) throw new Error('Error of authentication');
		const permissions = await this.permissions(header);
		return permissions.some(permission => { return permission === accessTo; });
	}
}

module.exports = AuthService;
