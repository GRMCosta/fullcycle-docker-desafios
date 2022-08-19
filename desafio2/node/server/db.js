const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

module.exports = connection;