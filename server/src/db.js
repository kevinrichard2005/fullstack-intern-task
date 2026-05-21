const knex = require('knex');
const knexfile = require('../knexfile');

const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env] || knexfile.development;

const db = knex(configOptions);

module.exports = db;
