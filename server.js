request = require('request');
express = require('express');
config = require('./config');
timer = require('timers');

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

function watcher() {
    // Loop to periodically request data
    setInterval(() => {
        requestData((data) => {
            updateDatabase(data);
        });
    }, dataRequestInterval);
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

app.listen(port, (error) => {
    if (error) {
        return console.log('something really bad happened. There is fire, someone soiled themself... ', error);
    }

    console.log(`server is listening on ${port}`);
});