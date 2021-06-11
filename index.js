var http = require('http');
var Datastore = require('nedb');
var db = new Datastore( { inMemoryOnly: true });
var ODataServer = require('simple-odata-server');
var Adapter = require('simple-odata-server-nedb');
 
var model = {
    default: true,
    namespace: "koios",
    entityTypes: {
        "UserType": {
            "id": {"type": "Edm.String", key: true},
            "test": {"type": "Edm.String"},            
        }
    },   
    entitySets: {
        "users": {
            entityType: "koios.UserType"
        }
    }
};

let portNumber = process.env.PORT;
if (!portNumber) portNumber = 1337
console.log(`Listening on port ${portNumber}.`);

var odataServer = ODataServer(`http://localhost:${portNumber}`)
    .model(model)
    .adapter(Adapter(function(es, cb) { cb(null, db)}));
odataServer.cors('*');
 
http.createServer(odataServer.handle.bind(odataServer)).listen(portNumber);