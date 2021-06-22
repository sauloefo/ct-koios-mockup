let Datastore = require('nedb');;

if (!process.env.IS_PRODUCTION) {
    console.log('Loading Datastore from local file system.');
    Datastore = require('../simple-odata-server-nedb');
}

module.exports = Datastore;