'use strict';
var request = require('request');
var express = require('express');
var config = require('./config');
var timer = require('timers');
var fs = require('fs');

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

app.get('/events', (request, response) => {
    // Build some json body.
    var events = {
        "Pine St" : {
            "start" : "2017-10-06T17:30:00",
            "end" : "2017-10-07T00:30:00",
            "cost" : 11
        }
    }
    response.send(events);
});

app.post('/events', (request, response, body) => {

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
    if (error) {
        console.log("Something gone broke: ", error);
    }
});
