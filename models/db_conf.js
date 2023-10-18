const config = require('../config');
const dbPath = config.dbPath;

const db = require('better-sqlite3')(dbPath, { verbose: console.log })

// TODO export your database object & create your models

module.exports = db;