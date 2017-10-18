'use strict';
const expressApp = require('express')();
const config = require('./config');
const basePatch = '/';

expressApp.disable('x-powered-by');

expressApp.use(basePatch, require('./routers/api-routes'));

expressApp.listen(config.port, () => {
	console.log(`server started on port ${config.port}`);
});

module.exports = expressApp;