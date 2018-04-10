let assert = require('assert');
const index = require('../routes/index');
const event = require('../routes/event');
const root = require('../routes/root');

class mockApp {
}

// Mock Functions
function mockUse(location, object) {
    switch (location) {
        case '/event':
            assert.equal(object, event.router, 'event route');
            break;
        case '/*':
            assert.equal(object, root, 'root route');
            break;
        default:
            throw 'Location Not Found';
    }
}

// Tests
describe('route-index', function () {

    // Test #1 getEventInsertFunction
    it('check for routes', function () {
        const app = new mockApp();
        app.use = mockUse;

        index(app);
    });
});
