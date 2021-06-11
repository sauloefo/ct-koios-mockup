var http = require('http');
var Datastore = require('nedb');
var db = new Datastore( { inMemoryOnly: true });
var ODataServer = require('simple-odata-server');
var Adapter = require('simple-odata-server-nedb');
 
var model = {
    namespace: "jsreport",
    entityTypes: {
        "UserType": {
            "_id": {"type": "Edm.String", key: true},
            "test": {"type": "Edm.String"},            
        }
    },   
    entitySets: {
        "users": {
            entityType: "jsreport.UserType"
        }
    }
};
 
var odataServer = ODataServer("http://localhost:1337")
    .model(model)
    .adapter(Adapter(function(es, cb) { cb(null, db)}));
 
let portNumber = process.env.PORT;

if (!portNumber) portNumber = 1337

console.log(`Listening on port ${portNumber}.`);
 
http.createServer(odataServer.handle.bind(odataServer)).listen(portNumber);