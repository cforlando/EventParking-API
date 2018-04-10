'use strict';

const express = require('express');
const mountRoutes = require('./routes');
const config = require('./config');
global.__basedir = __dirname;

const app = express();
mountRoutes(app);

const port = config.port;

app.listen(port, (error) => {
    console.log("listening on port: ", port);
    if (error) {
        console.log("Something gone broke: ", error);
    }
});
