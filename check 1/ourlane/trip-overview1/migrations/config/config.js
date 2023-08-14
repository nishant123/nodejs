const path = require('path');
require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example')
});

const sql = {
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  db: process.env.MYSQL_DB
};

module.exports = {
  development: {
    username: sql.username,
    password: sql.password,
    database: sql.db,
    host: sql.host,
    dialect: 'mysql',
    port: sql.port
  },
  test: {
    username: sql.username,
    password: sql.password,
    database: sql.db,
    host: sql.host,
    dialect: 'mysql',
    port: sql.port
  },
  production: {
    username: sql.username,
    password: sql.password,
    database: sql.db,
    host: sql.host,
    dialect: 'mysql',
    port: sql.port
  }
};
