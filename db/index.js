const { Pool } = require('pg');

let pool = new Pool;

module.exports = {
    query: (text, params) => pool.query(text, params)
};