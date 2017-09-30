'use strict';
var request = require('request');
var express = require('express');
var config = require('./config');
var timer = require('timers');
var fileSystem = require('fs');
var bodyParser = require('body-parser');


var app = express();
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

function eventParking(date) {
    var contents = fileSystem.readFileSync("dates.json");
    var json = JSON.parse(contents);

    var month = date.getMonth() + 1;
    var day = date.getDate() + 1;
    var year = date.getFullYear();

    if (year == json.year) {
        console.log("Year matches");
        if (month == json.month) {
            console.log("Month matches");
            if (json.days.indexOf(day) > -1) {
                console.log("Day matches");
                return true
            } 
        }
    } 

    return false
}

app.get('/', (request, response) => {
    response.send('This is not the end point you are looking for.');
});

app.post('/events', (request, response) => {
    // Build some json body.

    var success = false;
    var date = request.body.parameters.date;
    
    if (date) {
        success = eventParking(new Date(date));
    } else {
        success = eventParking(new Date());
    }

    if (success) {
        response.send("Yes, there is event parking.");
    } else {
        response.send("No, there isn't any event parking.");
    }
});

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
