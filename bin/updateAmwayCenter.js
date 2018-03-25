#!/usr/bin/env node

const logger = require('heroku-logger');
const query = require('../db/events');
const https = require('https');

getEvents().then(
    () => {
        logger.info('Amway Center Done');
    }
);

async function getEvents() {
    const months = getNextFourMonths();
    let options;

    for (let i = 0; i < months.length; ++i) {
        let body = '';

        options = {
            hostname: 'www.amwaycenter.com',
            path: '/events/calendar/' + months[i].year + '/' + months[i].month,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        await https.get(options, res => {
            res.setEncoding('utf8');
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                let newBody = JSON.parse(body);
                buildEventsArray(newBody).then(
                    query.addEvents
                )
            });
        });
    }
}

async function buildEventsArray(rawEvents) {
    logger.info("Build Events Array Started");

    let events = [];

    for (let i = 0; i < rawEvents['events'].length; ++i) {
        let event = {};

        event['venue'] = 'Amway Center';
        event['title'] = rawEvents['events'][i]['Title'];
        event['description'] = rawEvents['events'][i]['Description'];
        event['event_id'] = rawEvents['events'][i]['EventID'];
        event['start_date'] = rawEvents['events'][i]['StartDateTime'];
        event['end_date'] = rawEvents['events'][i]['EndDateTime'];
        event['category'] = rawEvents['events'][i]['Category'];
        event['promotions'] = rawEvents['events'][i]['Promotions'];
        event['url'] = rawEvents['events'][i]['URL'];
        event['image_url'] = rawEvents['events'][i]['ImageURL'];

        events.push(event);
    }

    return events;
}

function getNextFourMonths() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    let months = [];

    for (let i = 0; i < 4; ++i) {
        if (month + i < 13) {
            months.push({
                'month': month + i,
                'year': year
            })
        } else {
            months.push({
                'month': month + i - 12,
                'year': year + 1
            })
        }
    }

    return months;
}

