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

const portNumber = process.env.PORT || 1337;

const appDomain = process.env.APP_DOMAIN || `localhost:${portNumber}`;

const appUrl = `http://${appDomain}`;

var odataServer = ODataServer(appUrl)
    .model(model)
    .adapter(Adapter(function(es, cb) { cb(null, db)}));
odataServer.cors('*');

console.info(`OData service starting at ${appUrl}`);
 
http.createServer(odataServer.handle.bind(odataServer)).listen(portNumber);