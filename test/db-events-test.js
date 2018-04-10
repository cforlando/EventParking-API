let assert = require('assert');
let db_events = require('../db/events');


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


// Tests
describe('db-events', function () {

    // Test #1 getEventInsertFunction
    it('db-events-getEventInsertFunction',
        function () {
            assert.equal(
                db_events.getEventInsertFunction(mockEvents, 0),
                'SELECT insertevent(\'venue\', \'event_id\', \'title\', \'description\', \'start_date\', \'end_date\', \'category\', \'promotions\', \'url\', \'image_url\');'
            );
        }
    );

    // Test #2 addEvents
    it('db-events-addEvents-query', function (done) {
        db_events.addEvents(mockEvents).then(function(message) {
            assert.equal(message, mockEvents);
            done();
        }).catch(function (err) {
            done(err);
        });
    });

});
