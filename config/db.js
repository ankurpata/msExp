var mysql = require('mysql');
//var connection = mysql.createConnection({
//  host     : 'localhost',
//  user     : 'root',
//  password : 'pata',
//  database : 'ms'
//});

var db_config = {
    host: 'localhost',
    user: 'root',
    password: 'motor/4/9',
    database: 'ms'
};


var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        console.log('db error', err);
        handleDisconnect();

  if (err.code === 'ETIMEDOUT') {
            connection.connect();
        }
	if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      //      handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

setInterval(function () {
  var sql = 'SELECT count(1) FROM nc_cars';
  //connection.query('SELECT count(1) FROM nc_cars');
  connection.query(sql, function (err, result) {
  if (err) throw err;
    console.log( result);
  });
  console.log('-----SELECT count(1) FROM nc_cars ----');
}, 5000);

module.exports = connection;
