let Datastore = require('nedb');;

if (!process.env.IS_PRODUCTION) {
    Datastore = require('simple-odata-server-nedb');
}

module.exports = Datastore;