const event = require('./event');
const calendar = require('./calendar');
const root = require('./root');

module.exports = (app) => {
    app.use('/event', event);
    app.use('/calendar', calendar);
    app.use('/*', root);
};
