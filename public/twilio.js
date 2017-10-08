 // function notifyDealer(){
 //          // Twilio Credentials 
 //          var accountSid = 'AC2b0b3d93f83c517cf4ff08b9871143ba'; 
 //          var authToken = '4dd64c7d00e49d037f34be10e12d63c6'; 
           
 //          //require the Twilio module and create a REST client 
 //          var client = require('twilio')(accountSid, authToken); 
           
 //          client.messages.create({ 
 //              to: customer, 
 //              from: "+6159430239", 
 //              body: "\nThanks for shopping with Toyota!", 
 //          }, function(err, message) { 
 //              console.log(message.sid); 
 //          });

 //          console.log("message sent");
 //        }

var http = require('http');
var express = require('express');
var twilio = require('twilio');

var app = express();

app.post('/sms', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, function () {
  console.log("Express server listening on port 1337");
});