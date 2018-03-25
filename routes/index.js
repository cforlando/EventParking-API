const event = require('./event');

module.exports = (app) => {
    app.use('/event', event)
};
