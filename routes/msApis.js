var express = require('express');
var router = express.Router();
var searchModel = require('../models/search');
import fetch from 'isomorphic-fetch';
var Promise = require("bluebird");

//var db = require('../config/db.js');
//db.connect(function (err) {
//    if (!err) {
//        console.log("Database is connected.");
//    } else {
//        console.log("Error connecting database.");
//    }
//});

router.get('/hello', (req, res) => {
    res.json("helloss");
    console.log('Hello Api');
});

router.get('/fetchSuggestions', (req, res) => {
    console.log(req.query.q, 'autosuggest');
    var items = [{id: 1, label: 'label1'}, {id: 2, label: 'label2'}, {id: 3, label: 'label3'}, {id: 4, label: 'label4'}]
//    res.json({items: items})
    if (req.query.q) {
        return fetch(`http://www.motorsingh.com/home/fetchSuggestionsNC?queryStr=${req.query.q}`)
                .then((response) => response.json())
                .then((json) => {
//                console.log(json, 'json');
                    res.json({items: json});
                });
    } else {
        return false;
    }

});


var processParamsPromise = (params) => {
    var finalParams = [];
    return Promise.each(params, function (param) {
        if (param['type'] === 'price') {
            param['label'] = param['label'].replace('[price:', "").replace(']', "");
            var priceArr = param['label'].split("-");
            finalParams['price_min'] = priceArr[0];
            finalParams['price_max'] = priceArr[1];
            param = finalParams;
        } else {
            if (finalParams[param['type']]) {
                finalParams[param['type']] = finalParams[param['type']].concat(param['id'].split(" "));
            } else {
                if (param['type']) {
                    finalParams[param['type']] = param['id'].split(" ");
                } else {
                    var tmp = param['id'].split(" ");
                    //TODO: process na params by hitting autosugges api
                    return fetch(`http://www.motorsingh.com/home/fetchSuggestionsNC?queryStr=${tmp[0]}`)
                            .then((response) => response.json())
                            .then((json) => {
//                                console.log(json[0], 'jsonnnn');
                                finalParams[ json[0]['type']] = json[0]['id'];
//                                console.log(finalParams, 'jsonnnn');
                            });
                }
            }
        }
        return 3;
    });

}
var processParams = (params) => {
    var finalParams = [];
    return new Promise((resolve, reject) => {
        Promise.each(params, function (param) {

            /*
             * if price
             * if empty for free text add/url items add
             */
            if (param['type'] !== '') {
                if (param['type'] === 'price') {
                    param['label'] = param['label'].replace('[price:', "").replace(']', "");
                    console.log(2 + 'case');
                    var priceArr = param['label'].split("-");
                    finalParams['price_min'] = priceArr[0];
                    finalParams['price_max'] = priceArr[1];
                } else {
                    if (finalParams[param['type']]) {
                        console.log(1 + 'case');
                        finalParams[param['type']] = finalParams[param['type']].concat(param['id'].split(" "));
                    } else {
                        finalParams[param['type']] = param['id'].split(" ");
                    }
                }
            } else {
                var tmp = param['id'].split(" ");
                if (tmp[0].trim().toLowerCase() !== 'new' && tmp[0].trim() !== 'buy' && tmp[0].trim() !== 'cars') {
                    //TODO: process na params by hitting autosugges api
                    return new Promise((resolve, reject) => {

                        fetch(`http://www.motorsingh.com/home/fetchSuggestionsNC?queryStr=${tmp[0]}`)
                                .then((response) => {
                                    if (response) {
                                        return response.json()
                                    } else {
                                        return false;
                                    }
                                })
                                .then((json) => {
                                    console.log('--------------', json);
                                    if (json.length) {
                                        var ttd = (json[0]['id'] + "").split(" ");
                                        ttd = filterStopWords(ttd, json[0]['type'] );
                                        finalParams[ json[0]['type']] = ttd;
                                        console.log('--------------', finalParams);
                                        resolve(true);
                                    } else {
                                        resolve(true);
                                    }
                                });
                    });
                }
            }
        }).then(() => {
            resolve(finalParams);
        });
    });
};


var filterStopWords = (arr, type) => {
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length < 2 && type !== 'domain_unique_id') {
            continue;
        }
        if (arr[i].toLowerCase() == 'new' || arr[i] == 'cars') {
            continue;
        }
        ret.push(arr[i]);
    }
    return ret;
}
router.post('/searchCars', (req, res) => {
    console.log('---Search Api---');
    console.log(req.body, 'req.body');
    console.log('---Search Api-----------------------------------');

    processParams(req.body.tags).then(function (reqParams) {
        reqParams['pageNo'] = 0;
        if (req.body.pageNo) {
            reqParams['pageNo'] = req.body.pageNo;
        }
        reqParams['urlStr'] = req.body.urlStr;

        console.log(reqParams, '????reqParams????');
        searchModel.searchCars(reqParams, res, function (returnedValue) {
            res.json(returnedValue);
        });
    });
});

module.exports = router;
