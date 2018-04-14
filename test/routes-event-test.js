let assert = require('assert');
let routes_event = require('../routes/event');

let res = [];
let req = [];

req.params = [];
req.params.year = '2018';
req.params.month = '04';
req.params.day = '07';
res.header = mockRouterReqHeader;
res.send = mockRouterReqSend;

// Mock Functions
function mockRouterReqHeader(value, value2) {
    assert.equal(typeof(value), 'string', 'Check value Passed as String');
    assert.equal(typeof(value2), 'string', 'Check value2 Passed as String');
}

async function mockRouterReqSend(value) {
    assert.equal(value, 'mock_db_query_successful', 'Check that mocked query value sent as response');
}

// Tests
describe('routes-event', function () {
    // Test #1 getEndOfMonth
    it('routes-event-getEndOfMonth',
        function () {
            assert.equal(routes_event.getEndOfMonth('2018', '11'), '2018/11/30', 'check 11/30/2018');
        }
    );
    // Test #2 getEndOfMonth
    it('routes-event-getEndOfMonth-leapYear',
        function () {
            assert.equal(routes_event.getEndOfMonth('2020', '2'), '2020/2/29', 'check 02/29/2020');
        }
    );
    // Test #3 getNextDate
    it('routes-event-getNextDate',
        function () {
            assert.equal(routes_event.getNextDate('2020', '12', '31'), '2021/1/1', 'check 01/1/2021');
        }
    );
    // Test #4 router-use-year/month/day
    it('routes-event-getEventsByDay',
        function (done) {
            routes_event.getEventsByDay(req, res).then(() => {done()}).catch((err) => {done(err)})
        }
    );
    // Test #5 router-use-year/month
    it('routes-event-getEventsByMonth',
        function (done) {
            routes_event.getEventsByMonth(req, res).then(() => {done()}).catch((err) => {done(err)})
        }
    );
});
