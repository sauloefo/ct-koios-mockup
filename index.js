var http = require('http');
var Datastore = require('nedb');
var db = new Datastore( { inMemoryOnly: true });
var ODataServer = require('./odata-server');
var Adapter = require('simple-odata-server-nedb');
 
var model = {
  namespace: "koios",
  entityTypes: {
      "Booking": {
          "_id": { "type": "Edm.String", key: true },
          "Booking_id": { "type": "Edm.String" },
          "Booking_Status": { "type": "Edm.String" },
          "BookingDate": { "type": "Edm.DateTimeOffset" },
          "brand_type": { "type": "Edm.String" },
          "card_number": { "type": "Edm.String" },
          "client_id": { "type": "Edm.Int32" },
          "Country_of_Residence": { "type": "Edm.String" },
          "customer_email": { "type": "Edm.String" },
          "customer_first_name": { "type": "Edm.String" },
          "customer_id": { "type": "Edm.Int32" },
          "customer_last_name": { "type": "Edm.String" },
          "Email": { "type": "Edm.String" },
          "FirstName": { "type": "Edm.String" },
          "Pickup_Date": { "type": "Edm.DateTimeOffset" },
          "pickup_location_name": { "type": "Edm.String" },
          "Pickup_Time": { "type": "Edm.String" },
          "ref": { "type": "Edm.Int32" },
          "searchable_Email": { "type": "Edm.String" },
          "searchable_supplier_ref": { "type": "Edm.String" },
          "Supplier_Name": { "type": "Edm.String" },
          "Supplier_Reference": { "type": "Edm.String" },
          "Surname": { "type": "Edm.String" }
      },
      "Person": {
        "_id": { "type": "Edm.String", key: true },
        "Name": { "type": "Edm.String" }
      }
  },   
  entitySets: {
      "SalesForce_Bookings": {
          entityType: "koios.Booking"
      },
      "People": {
          entityType: "koios.Person"
      }
  }
};

const portNumber = process.env.PORT || 1337;

const appDomain = process.env.APP_DOMAIN || `localhost:${portNumber}`;

const appUrl = `http://${appDomain}`;

var odataServer = ODataServer(appUrl)
    .model(model)
    .adapter(Adapter(function(entitySetName, cb) { cb(null, db); }));
odataServer.cors('*');

console.info(`OData service starting at ${appUrl}`);
 
http.createServer(odataServer.handle.bind(odataServer)).listen(portNumber);