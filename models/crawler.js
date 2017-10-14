/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var db = require('../config/db.js');

//db.connect(function (err) {
//    if (!err) {
//        console.log("Database is connectedd.");
//    } else {
//        console.log("Error connecting databases.");
//    }
//});

function saveCWData(data) {

    var query = db.query('INSERT INTO nc_cars SET ?', data,
            function (err, result) {
                if (err) {
//                    console.log(data, '_____data___');
                    console.log(this.sql, 'sql');
//                    console.log(query, 'query');
                    console.log(err.code, err.sqlMessage);
                }else{
                    console.log("Something else happened", err, result, data.variant_url)
                }
            });

}

// Functions which will be available to external callers
exports.saveCWData = saveCWData;
