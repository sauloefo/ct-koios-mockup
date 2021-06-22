let ODataServer = require('simple-odata-server');

if (!process.env.IS_PRODUCTION) {
    console.log('Loading odata-server from local file system.');
    ODataServer = require('../node-simple-odata-server');
}

module.exports = function (options) {
    return new ODataServer(options)
}