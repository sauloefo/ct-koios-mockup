let adapter = require('simple-odata-server-nedb');

if (!process.env.IS_PRODUCTION) {
    console.log('Loading NEDB Adapter from local file system.');
    adapter = require('../node-simple-odata-server-nedb');
}

module.exports = adapter;