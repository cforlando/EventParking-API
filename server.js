'use strict';
var request = require('request');
var express = require('express');
var config = require('./config');
var timer = require('timers');
var fileSystem = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = config.port;
const dataRequestInterval = config.dataRequestInterval;

function requestData(callback) {
    callback("some data");
}

function updateDatabase(data) {
    var minimumData = Date.now()
    // Add new data
    // remove old data
}

function startWatcher() {
    // Loop to periodically request data
    setInterval(() => {
        requestData((data) => {
            updateDatabase(data);
        });
    }, dataRequestInterval); // This will fire every two weeks.
}

function eventDates() {
    var contents = fileSystem.readFileSync("dates.json");
    var json = JSON.parse(contents);
    return json;
}

function eventParking(date) {
    var isoString = date.toISOString().split('T')[0];
    if (eventDates().indexOf(isoString) > -1) {
        console.log("Day matches");
        return true
    } 

    return false
}

app.get('/', (request, response) => {
    response.send('This is not the end point you are looking for.');
});

app.post('/events', (request, response) => {
    // Build some json body.

    var success = false;
    console.log(request.body.result.parameters);
    var date = request.body.result.parameters.date;
    
    if (date) {
        success = eventParking(new Date(date));
    } else {
        success = eventParking(new Date());
    }

    var actionResponse = {
      "speech" : "Yes this is working",
      "displayText" : "Yes, this is absolutely working",
      "source" : "EventParkingApi"
    }

    if (success) {
        actionResponse.speech = "Yes, there is event parking.";
        actionResponse.displayText = "Yes";
    } else {
        actionResponse.speech = "No, there isn't any event parking.";
        actionResponse.displayText = "No";
    }

    response.send(actionResponse);
});

app.get('/events', (request, response) => {
    response.send(eventDates());
})

app.post('/action', (request, response, body) => {

    var actionResponse = {
      "speech" : "Yes this is working",
      "displayText" : "Yes, this is absolutely working",
      "source" : "EventParkingApi"
    }

    response.send(actionResponse);
});

app.listen(port, (error) => {
    console.log("listening on port: ", port);
    if (error) {
        console.log("Something gone broke: ", error);
    }
});
