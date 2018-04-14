const event = require('./event');
const root = require('./root');

module.exports = (app) => {
    app.use('/event', event.router);
    app.use('/*', root);
};
