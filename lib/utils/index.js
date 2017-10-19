'use strict';

const jwt = require('jsonwebtoken');
const bearer = require('token-extractor');

class Utils {
	static async signToken(payload, secret, options) {
		return new Promise((resolve, reject) => {
			jwt.sign(payload, secret, options, (err, token) => {
				if (err) return reject(err);
				resolve(token);
			});
		});
	}

	static async verifyToken(token, secret, options) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, secret, options, (err, decoded) => {
				if (err) return reject(err);
				resolve(decoded);
			});
		});
	}

	static async extractToken(req) {
		return new Promise((resolve, reject) => {
			bearer(req, (err, token) => {
				if (err) return reject(err);
				resolve(token);
			});
		});
	}
}

module.exports = Utils;
