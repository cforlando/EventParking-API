const Router = require('express-promise-router');
const path = require('path');

const router = new Router();

module.exports = router;

router.use('/', async (req, res) => {
    res.sendFile(path.join(__basedir + '/public' + req.originalUrl));
});
