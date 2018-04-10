// Mocha test setup

let assert = require('assert');
const db = require('../db');
const logger = require('heroku-logger');

before(function() {
    db.query = mock_db_query_successful;
    logger.info = mock_logger_info;
    logger.error = mock_logger_error;
});

beforeEach (function() {
});

// Mock Functions
async function mock_db_query_successful(sql) {
    describe('mock-db-query_successful', function () {
        it('should take a sql string',
            function () {
                assert.equal(typeof(sql), 'string', 'Check Sql Passed as String');
            }
        )
    });
    return 'mock_db_query_successful';
}

function mock_logger_info(message) {
    describe('mock_logger_info', function () {
        it('should take a sql string',
            function () {
                assert.equal(typeof(message), 'string', 'Check info message Passed as String');
            }
        )
    });
    return 'mock_logger_info';
}

function mock_logger_error(message) {
    describe('mock_logger_error', function () {
        it('should take a sql string',
            function () {
                assert.equal(typeof(message), 'string', 'Check error message Passed as String');
            }
        )
    });
    return 'mock_logger_error';
}

