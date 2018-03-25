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
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;
    const date = year + '/' + month + '/' + day;
    const nextDate = getNextDate(year, month, day);
    const sql = "SELECT * FROM events WHERE (start_date BETWEEN '" + date + "' AND '" + nextDate + "') OR (end_date BETWEEN '" + date + "' AND '" + nextDate + "') OR ('" + date + "' BETWEEN start_date AND end_date);";

    logger.info("Requested: " + date);
    const { rows } = await db.query(sql);
    res.send(rows);
});

function getNextDate(year, month, day) {

    let nextDay = new Date();
    nextDay.setDate(new Date(year, month - 1, day).getDate() + 1);

    return nextDay.getFullYear() + '/' + (nextDay.getMonth() + 1) + '/' + nextDay.getDate();
}
