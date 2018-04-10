const logger = require('heroku-logger');
const Router = require('express-promise-router');

const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = {
    router: router,
    getEndOfMonth: getEndOfMonth,
    getNextDate: getNextDate,
    getEventsByDay: getEventsByDay,
    getEventsByMonth: getEventsByMonth,
};

router.use('/:year/:month/:day', getEventsByDay);

router.use('/:year/:month', getEventsByMonth);

function getEventsByDay(request, response) {
    setCorsHeaders(response);

    const year = request.params.year;
    const month = request.params.month;
    const day = request.params.day;
    const date = year + '/' + month + '/' + day;
    const nextDate = getNextDate(year, month, day);
    const sql = "SELECT * FROM events WHERE (start_date BETWEEN '" + date + "' AND '" + nextDate + "') OR (end_date BETWEEN '" + date + "' AND '" + nextDate + "') OR ('" + date + "' BETWEEN start_date AND end_date);";

    logger.info("Requested Day: " + date);
    logger.info("SQL: " + sql);
    db.query(sql).then((rows) => {response.send(rows)});
}

function getEventsByMonth(request, response) {
    setCorsHeaders(response);

    const year = request.params.year;
    const month = request.params.month;
    const date = year + '/' + month + '/01';
    const endOfMonth = getEndOfMonth(year, month);
    const sql = "SELECT * FROM events WHERE (start_date BETWEEN '" + date + "' AND '" + endOfMonth + "') OR (end_date BETWEEN '" + date + "' AND '" + endOfMonth + "') OR ('" + date + "' BETWEEN start_date AND end_date);";

    logger.info("Requested Month: " + date);
    logger.info("SQL: " + sql);
    db.query(sql).then((rows) => {response.send(rows)});
}

function setCorsHeaders(response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    return response;
}

function getEndOfMonth(year, month) {
    const end = new Date(year, month, 0);

    return end.getFullYear() + '/' + (end.getMonth() + 1) +'/' +end.getDate();
}

function getNextDate(year, month, day) {
    let monthIndex = parseInt(month) - 1;

    let nextDay = new Date(year, monthIndex, (parseInt(day) + 1));

    return nextDay.getFullYear() + '/' + (nextDay.getMonth() + 1) + '/' + nextDay.getDate();
}
