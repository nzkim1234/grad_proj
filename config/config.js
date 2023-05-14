const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.dbPassword,
    port: 3306,
    database: "project"
  })
  
  db.connect();

  module.exports = db;