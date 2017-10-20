'use strict';

const jwt = require('jsonwebtoken');

class Utils {
	/**
	 * SingToken generator 
	 * @param {Object} payload data to transformed in token
	 * @param {String} secret secret for generate token
	 * @param {Object} options optios of config
	 * @description This method generate json web token
	 * @returns {String} returns data transformed in jwt
	 */
	static async signToken(payload, secret, options) {
		return new Promise((resolve, reject) => {
			jwt.sign(payload, secret, options, (err, token) => {
				if (err) return reject(err);
				resolve(token);
			});
		});
	}

	/**
	 * verifyToken 
	 * @param {String} token json jew token  
	 * @param {String} secret secret for desencrypt token
	 * @param {Object} options option configurations 
	 * @description this method verify token and return token decoded 
	 * @returns {Object} return token data decoded
	 */
	static async verifyToken(token, secret, options) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, secret, options, (err, decoded) => {
				if (err) return reject(err);
				resolve(decoded);
			});
		});
	}
}

module.exports = Utils;
