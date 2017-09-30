'use strict';
var request = require('request');
var express = require('express');
var config = require('./config');
var timer = require('timers');
var fileSystem = require('fs');

var app = express();
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

app.get('/', (request, response) => {
    response.send('This is not the end point you are looking for.');
});

app.post('/events', (request, response) => {
    // Build some json body.
    var contents = fileSystem.readFileSync("dates.json");
    var json = JSON.parse(contents);

    var today = Date.now();
    var month = 10;//today.month;
    var day = 31;//today.date;
    var year = today.year;

    if (year == json.year) {
        if (month == json.month) {
            if (json.days.indexOf(day) > -1) {
                response.send("Yes, there is event parking.");
            }
        }
    }

    response.send("No, there isn't any event parking.");
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
