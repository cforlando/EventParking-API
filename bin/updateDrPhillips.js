#!/usr/bin/env node

const logger = require('heroku-logger');
const query = require('../db/events');
const https = require('https');

getEvents().then(
    () => {
        logger.info('Dr Phillips Done');
    }
);

async function getEvents() {
    let body = '';

    await https.get('https://www.drphillipscenter.org/proxy/events', res => {
        res.setEncoding('utf8');
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
            body = JSON.parse(body);
            buildEventsArray(body).then(
                query.addEvents
            )
        });
    });

    return body;
}

async function buildEventsArray(rawEvents) {
    let events = [];

    for (let i = 0; i < rawEvents.length; ++i) {
        let title = rawEvents[i]['title'];
        let url = rawEvents[i]['event_url'];
        let image_url = rawEvents[i]['image_url'];

        for (let j = 0; j < rawEvents[i]['performances'].length; ++j) {
            let event = {};

            event['venue'] = 'Dr Phillips Center';
            event['title'] = title;
            event['description'] = '';
            event['event_id'] = rawEvents[i]['performances'][j]['perf_no'].toString();
            event['start_date'] = rawEvents[i]['performances'][j]['perf_date'];
            event['end_date'] = rawEvents[i]['performances'][j]['perf_date'];
            event['category'] = '';
            event['promotions'] = '';
            event['url'] = url;
            event['image_url'] = image_url;

            events.push(event);
        }
    }
    return events;
}