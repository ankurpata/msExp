var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pata',
  database : 'ms'
});

module.exports = connection;
