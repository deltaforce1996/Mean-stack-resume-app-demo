var mysql = require('mysql');

var db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'resume_db'
});

module.exports = db;