const logger = require('heroku-logger');
const Router = require('express-promise-router');

const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;


router.use('/:year/:month/:day', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;
    const date = year + '/' + month + '/' + day;
    const nextDate = getNextDate(year, month, day);
    const sql = "SELECT * FROM events WHERE (start_date BETWEEN '" + date + "' AND '" + nextDate + "') OR (end_date BETWEEN '" + date + "' AND '" + nextDate + "') OR ('" + date + "' BETWEEN start_date AND end_date);";

    logger.info("Requested Day: " + date);
    logger.info("SQL: " + sql);
    const { rows } = await db.query(sql);
    res.send(rows);
});

router.use('/:year/:month', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const year = req.params.year;
    const month = req.params.month;
    const date = year + '/' + month + '/01';
    const endOfMonth = getEndOfMonth(year, month);
    const sql = "SELECT * FROM events WHERE (start_date BETWEEN '" + date + "' AND '" + endOfMonth + "') OR (end_date BETWEEN '" + date + "' AND '" + endOfMonth + "') OR ('" + date + "' BETWEEN start_date AND end_date);";

    logger.info("Requested Month: " + date);
    logger.info("SQL: " + sql);
    const { rows } = await db.query(sql);
    res.send(rows);
});

function getEndOfMonth(year, month) {
    const end = new Date(year, month, 0);

    return end.getFullYear() + '/' + (end.getMonth() + 1) +'/' +end.getDate();
}

function getNextDate(year, month, day) {
    let monthIndex = parseInt(month) - 1;

    let nextDay = new Date(year, monthIndex, (parseInt(day) + 1));

    return nextDay.getFullYear() + '/' + (nextDay.getMonth() + 1) + '/' + nextDay.getDate();
}
