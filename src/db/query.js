const {Pool} = require('pg');
const config = require('config')
const {escapeArray} = require('./escaping');
const databaseConf = config.get('database');

const pool = new Pool(databaseConf);
const query = async (text, params) => {
    return await pool.query(text, params && escapeArray(params));
}


module.exports = {query};