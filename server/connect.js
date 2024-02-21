const mysql = require("mysql");

exports.db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "social"
})

