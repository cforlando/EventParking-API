const rewire = require('rewire');
let assert = require('assert');
let eventsQuery = rewire('../db/events');

let db = eventsQuery.__get__('db');
let logger = eventsQuery.__get__('logger');

let db_query_exec_count;
let logger_info_exec_count;
let logger_error_exec_count;

db.query = function (sql) {
    ++db_query_exec_count;
    return mock_db_query_successful(sql);
};

logger.info = function (message) {
    ++logger_info_exec_count;
    return mock_logger_info(message);
};
logger.error = function (message) {
    ++logger_error_exec_count;
    return mock_logger_error(message);
};

const mockEvents = [];
mockEvents[0] = [];
mockEvents[0]['venue'] = 'venue';
mockEvents[0]['event_id'] = 'event_id';
mockEvents[0]['title'] = 'title';
mockEvents[0]['description'] = 'description';
mockEvents[0]['start_date'] = 'start_date';
mockEvents[0]['end_date'] = 'end_date';
mockEvents[0]['category'] = 'category';
mockEvents[0]['promotions'] = 'promotions';
mockEvents[0]['url'] = 'url';
mockEvents[0]['image_url'] = 'image_url';


// Mock Functions
async function mock_db_query_successful(sql) {
    describe('mock-db-query_successful', function () {
        it('should take a sql string',
            function () {
                assert.equal(typeof(sql), 'string');
            }
        )
    });
    return 'mock_db_query_successful';
}

async function mock_db_query_failed(sql) {
    describe('mock-db-query_failed', function () {
        it('should take a sql string',
            function () {
                assert.equal(typeof(sql), 'string');
            }
        )
    });
    console.log('exception thrown');
    throw 'mock_db_query_failed';
}

function mock_logger_info(message) {
    describe('mock_logger_info', function () {
        it('should take a sql string',
            function () {
                assert.equal(typeof(message), 'string');
            }
        )
    });
    return 'mock_logger_info';
}

function mock_logger_error(message) {
    describe('mock_logger_error', function () {
        it('should take a sql string',
            function () {
                assert.equal(typeof(message), 'string');
            }
        )
    });
    return 'mock_logger_error';
}

// Tests

describe('db-events', function () {

    // Test #1 getEventInsertFunction
    it('db-events-getEventInsertFunction',
        function () {
            assert.equal(
                eventsQuery.getEventInsertFunction(mockEvents, 0),
                'SELECT insertevent(\'venue\', \'event_id\', \'title\', \'description\', \'start_date\', \'end_date\', \'category\', \'promotions\', \'url\', \'image_url\');'
            );
        }
    );

    // Test #2 addEvents with successful query
    it('db-events-addEvents-successful-query', function () {
        db_query_exec_count = 0;
        logger_info_exec_count = 0;
        logger_error_exec_count = 0;

        eventsQuery.addEvents(mockEvents).then(
            function () {
                assert.equal(db_query_exec_count, 1, 'addEvents Success query run count');
                assert.equal(logger_info_exec_count, 3, 'addEvents Success info log run count');
                assert.equal(logger_error_exec_count, 0, 'addEvents Success error log run count');
            }
        ).catch(function (err) {
            done(err)
        })
    });

    // Test #3 addEvents with failed query
    it('should hit db query once, logger.info once, logger.error once', function (done) {
        db.query = function (sql) {
            ++db_query_exec_count;
            return mock_db_query_failed(sql);
        };

        db_query_exec_count = 0;
        logger_info_exec_count = 0;
        logger_error_exec_count = 0;

        eventsQuery.addEvents(mockEvents).then(
            function () {
                assert.equal(db_query_exec_count, 1, 'addEvents failed query run count');
                assert.equal(logger_info_exec_count, 2, 'addEvents failed info log run count');
                assert.equal(logger_error_exec_count, 1, 'addEvents failed error log run count');
                done();
            }
        ).catch(function (err) {
            done(err)
        })
    });
});
