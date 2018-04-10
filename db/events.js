const db = require('../db');
const logger = require('heroku-logger');

module.exports = {
    addEvents: addEvents,
    getEventInsertFunction: getEventInsertFunction,
};

async function addEvents(events) {
    logger.info('Run Query Started');
    let message = '';
    for (let k = 0; k < events.length; ++k) {
        let sql = getEventInsertFunction(events, k);

        logger.info('Sql == ' + sql);

        await db.query(sql).then(function (res) {
            message = 'Success';
            logger.info('Added: ' + events[k]['event_id'] + ' :: ' + events[k]['title']);
        }).catch(function (err) {
            message = null;
            logger.error("Could Not Add: " + events[k]['event_id'] + ' :: ' + events[k]['title']);
        });
    }
    return events;
}

function getEventInsertFunction(events, k) {
    let sql = 'SELECT insertevent(\'';
    sql += events[k]['venue'].split("'").join("''") + '\', \'';
    sql += events[k]['event_id'].split("'").join("''") + '\', \'';
    sql += events[k]['title'].split("'").join("''") + '\', \'';
    sql += events[k]['description'].split("'").join("''") + '\', \'';
    sql += events[k]['start_date'].split("'").join("''") + '\', \'';
    sql += events[k]['end_date'].split("'").join("''") + '\', \'';
    sql += events[k]['category'].split("'").join("''") + '\', \'';
    sql += events[k]['promotions'].split("'").join("''") + '\', \'';
    sql += events[k]['url'].split("'").join("''") + '\', \'';
    sql += events[k]['image_url'].split("'").join("''") + '\');';

    return sql;
}
