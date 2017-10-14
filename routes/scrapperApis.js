var express = require('express');
var router = express.Router();

var Promise = require("bluebird");
//var request = require('request');
//var request = Promise.promisify(require("request"));
var request = Promise.promisifyAll(require('request'), {multiArgs: true});

var cheerioAdv = require('cheerio-advanced-selectors')
var cheerio = require('cheerio');
cheerio = cheerioAdv.wrap(cheerio)

//var cheerio = Promise.promisify(require("cheerio"));

//var db = require('../config/db.js');
var dbModel = require('../models/crawler');
var commonApis = require('../constants/common');

router.get('/hello', (req, res) => {
    res.json("helloss scrapper");
    console.log('Hello Api');
});

var BreakException = {};
router.get('/getCW', (req, res) => {

    var allMake = [];
    var allModel = [];
    var allVariant = [];

    try {
        request('https://www.carwale.com/new/', function (err, resp, html) {
            if (!err) {
                var $ = cheerio.load(html);
                $('.brand-type-container li').each(function (i, elm) {
//                    console.log('l1');
                    var makeUrl = "https://www.carwale.com" + $("a", this).attr('href');
                    request(makeUrl, function (err, resp, html) {
                        if (!err) {
                            var $ = cheerio.load(html);

                            $('a.font18').each(function (i, elm) {
//                                console.log('l2');

                                var modelUrl = "https://www.carwale.com" + $(this).attr('href');
//                                console.log(modelUrl);

                                request(modelUrl, function (err, resp, html) {
                                    if (!err) {
                                        var m$ = cheerio.load(html);
                                        m$('td.variant__name-cell').each(function (i, elm) {
//                                            console.log('l3');
                                            var variant_url = "https://www.carwale.com" + m$("a", this).attr('href');
//                                            console.log(variant_url);
                                            request("https://www.carwale.com" + m$("a", this).attr('href'), function (err, resp, html) {
                                                if (!err) {
                                                    var v$ = cheerio.load(html);
                                                    var data = {};
                                                    //extract and save data in db.
                                                    data['model_url'] = modelUrl;
                                                    data['make_url'] = makeUrl;
                                                    data['variant_url'] = variant_url;
                                                    data['domain'] = 'carwale';
                                                    data['domain_unique_id'] = 2;
                                                    data['make'] = v$('ul.breadcrumb li:nth-child(2)').text().replace(/[\n\t\r›]/g, "").trim();
                                                    data['model'] = v$('ul.breadcrumb li:nth-child(3)').text().replace(/[\n\t\r›]/g, "").trim();
                                                    data['variant'] = v$('ul.breadcrumb li:nth-child(4)').text().replace(/[\n\t\r›]/g, "").trim();
                                                    data['img_url'] = v$('div.gallery-wrapper  div.jcarousel ul li:nth-child(1)').find('img').attr('src');
                                                    data['price'] = v$('div#divModelDesc  div.leftfloat div.textBlock span.font24.text-black.margin-right5').text().replace(/[\n\t\r›₹]/g, "").trim();
                                                    data['price'] = commonApis.getFormatNo(data['price']);
                                                    var otherArray = [];
                                                    v$('table#tbOverview tbody tr').each(function (i, elm) {
                                                        var tpc = v$("td", this).first().text().replace(/[\n\t\r]/g, "").trim();
                                                        if (tpc === 'Fuel Type') {
                                                            data['fuel_type'] = v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim();
                                                        } else if (tpc === 'Transmission Type') {
                                                            data['transmission_type'] = v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim();
                                                        } else if (tpc == 'Seating Capacity') {
                                                            data['seating_capacity'] = v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim();
                                                        } else if (tpc == 'Displacement') {
                                                            data['displacement'] = v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim();
                                                        } else if (tpc == 'No of gears') {
                                                            data['no_of_gears'] = v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim();
                                                        } else {
                                                            if (v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim() != '' &&
                                                                    v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim() != 'No' &&
                                                                    v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim() != 'NA') {
                                                                otherArray[tpc] = v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim();
                                                            }
                                                        }
//                                                        data[v$("td", this).first().text().replace(/[\n\t\r]/g, "").trim()] = v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim();
                                                    })

                                                    v$('table.specs').each(function (i, elm) {
                                                        v$("tr[itemmasterid]", this).each(function (i, elm) {
                                                            if (v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim() != '' &&
                                                                    v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim() != 'No' &&
                                                                    v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim() != 'NA') {
                                                                otherArray[v$("td", this).first().text().replace(/[\n\t\r]/g, "").trim()] = v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim();
                                                            }
                                                        })
                                                    })

                                                    v$('table.specs.features').each(function (i, elm) {
                                                        var b = true;
                                                        v$("tr", this).each(function (i, elm) {
                                                            if (!b) {
                                                                if (v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim() != '' &&
                                                                        v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim() != 'No' &&
                                                                        v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim() != 'NA') {
                                                                    otherArray[v$("td", this).first().text().replace(/[\n\t\r]/g, "").trim()] = v$("td", this).last().text().replace(/[\n\t\r›]/g, "").trim();
                                                                }
                                                            }
                                                            if (b) {
                                                                b = false;
                                                            }
                                                        })
                                                    })
                                                    data['color'] = '';
                                                    v$('#tabColours ul.ul-horz ul.ul-horz li').each(function (i, elm) {
                                                        data['color'] = data['color'] + ", " + v$("div.colorName", this).text().replace(/[\n\t\r]/g, "").trim();
                                                    });

                                                    var dbData = {};
                                                    data['others'] = '';
                                                    for (var key in otherArray) {
                                                        data['others'] += '"' + key + ":" + otherArray[key] + '", ';
//                                                        if (key in commonApis.scrapperFieldMapping) {
//                                                            dbData[commonApis.scrapperFieldMapping[key]] = data[key];
//                                                        }
                                                    }
//                                                    data['others'] = data['others'].substring(0, 9999);
                                                    //save data in mysql db
                                                    dbModel.saveCWData(data);
//                                                    throw BreakException;
                                                }
                                            });


                                        });
                                    } else {
                                        console.log('error')
                                    }
                                });
                            });
                        }
                    });
                });
//                 throw BreakException;
            }
        });
    } catch (e) {
        if (e !== BreakException)
            throw e;
    }

});



router.get('/getCD', (req, res) => {
    try {
        request.getAsync('https://www.cardekho.com/newcars').spread(function (response, body) {
            var makeUrls = [];
            var $ = cheerio.load(body);
            $('tr#brandsDiv td').each(function (i, elm) {
                makeUrls.push($("a", elm).attr('href'));
            });
            return makeUrls;
        }).then((makeUrls) => {
            return Promise.each(makeUrls, function (elem) {

                console.log(elem);
                var makeUrl = elem;
                return request.getAsync(elem).spread(function (response, body) {
                    var modelUrls = [];
                    var m$ = cheerio.load(body);
                    m$('a.modeltext').each(function (i, elm) {
                        modelUrls.push(m$(this).attr('href'));
                    });
                    return modelUrls;
                }).then((modelUrls) => {
                    return Promise.each(modelUrls, function (elem) {
                        var modelUrl = elem;
                        console.log(modelUrl);

                        return request.getAsync(elem).spread(function (response, body) {
                            var variantUrls = [];
                            var ml$ = cheerio.load(body);
                            ml$('a.crdtext').each(function (i, elm) {
                                variantUrls.push(ml$(this).attr('href'));
                            });
                            return variantUrls;
                        }).then((variantUrls) => {
                            return Promise.each(variantUrls, function (elem) {
//                                return console.log(elem);

                                return request.getAsync(elem).spread(function (response, body) {
                                    var v$ = cheerio.load(body);
                                    var data = {};
                                    var otherArray = [];
                                    //extract and save data in db.
                                    data['model_url'] = modelUrl;
                                    data['make_url'] = makeUrl;
                                    data['variant_url'] = elem;
                                    data['domain'] = 'cardekho';
                                    data['domain_unique_id'] = 5;
                                    data['make'] = v$('div.breadcrumbs div.mainbox.widthbreadcum span a:eq(2)').text().replace(/[\n\t\r›]/g, "").trim();
                                    data['model'] = v$('div.breadcrumbs div.mainbox.widthbreadcum span a:eq(3)').text().replace(/[\n\t\r›]/g, "").trim();
                                    data['variant'] = v$('div.breadcrumbs div.mainbox.widthbreadcum span.last span').text().replace(/[\n\t\r›]/g, "").trim();
                                    data['img_url'] = v$('div#cd-intro.mainblock div.rightpanel div.imghold a').find('img').attr('src');
                                    data['price'] = v$('div#cd-intro.mainblock div.leftpanel div.pricehold div.priceleft span:eq(2)').text().replace(/[\n\t\r›*]/g, "").trim();
                                    data['price'] = commonApis.getFormatNo(data['price']);

                                    var colorLink = v$('div#tabsection.tabsection div.modelnewtab div#modeltab.modeltab div ul li[title=Colors] a').attr('href').trim();
                                    return request.getAsync(colorLink).spread(function (response, body) {
                                        var color$ = cheerio.load(body);
                                        var colorStr = color$('#slider2').text().replace(/\s\s+/g, ', ');
                                        return colorStr;
                                    }).then((colorStr) => {
                                        data['color'] = colorStr;
                                    }).then(() => {
                                        var specsLink = v$('div#tabsection.tabsection div.modelnewtab div#modeltab.modeltab div ul li[title=Specs] a').attr('href').trim();
                                        return request.getAsync(specsLink).spread(function (response, body) {
                                            var specs$ = cheerio.load(body);
                                            specs$('div.comparewrap table.specinner').each(function (i, elm) {
                                                specs$("tbody.compcontent.comparetable.width100 tr", this).each(function (i, elm) {
                                                    specs$('td:eq(0)', this).children().remove();
                                                    var tld = specs$('td:eq(0)', this).text().replace(/[\n\t\r]/g, "").trim();
                                                    if (tld === 'Fuel Type') {
                                                        data['fuel_type'] = specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim();
                                                    } else if (tld === 'Transmission Type') {
                                                        data['transmission_type'] = specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim();
                                                    } else if (tld === 'Transmission Type') {
                                                        data['transmission_type'] = specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim();
                                                    } else if (tld === 'Seating Capacity') {
                                                        data['seating_capacity'] = specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim();
                                                    } else if (tld === 'Engine Displacement(cc)') {
                                                        data['displacement'] = specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim();
                                                    } else if (tld === 'Gear box') {
                                                        data['no_of_gears'] = specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim();
                                                    } else {
                                                        if (specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim() != '' &&
                                                                specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim() != 'No' &&
                                                                specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim() != '-' &&
                                                                specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim() != 'NA') {
                                                            otherArray[tld] = specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim();
                                                        }
                                                    }
//                                                    data[specs$('td:eq(0)', this).text().replace(/[\n\t\r]/g, "").trim()] = specs$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim();
                                                });
                                            });
                                        }).then(() => {
//                                            console.log(data);
                                            var featuresLink = v$('div#tabsection.tabsection div.modelnewtab div#modeltab.modeltab div ul li[title=Features] a').attr('href').trim();
                                            return request.getAsync(featuresLink).spread(function (response, body) {
                                                var featuresLink$ = cheerio.load(body);
                                                featuresLink$('div.comparewrap div.specinner div').each(function (i, elm) {
                                                    featuresLink$("div.compcontent ul li", this).each(function (i, elm) {
                                                        var lp = featuresLink$('div.compareleft.textalignunset', this).text().replace(/[\n\t\r›]/g, "").trim();
                                                        if (featuresLink$('div.compareright div.W50Percent span', this).hasClass('comparerighticon')) {
                                                            otherArray[lp] = 'Yes';
                                                        }
//                                                        data[featuresLink$('td:eq(0)', this).text().replace(/[\n\t\r]/g, "").trim()] = featuresLink$('td:eq(1)', this).text().replace(/[\n\t\r›]/g, "").trim();
                                                    });
                                                });
                                            });
                                            throw BreakException;
                                        }).then(() => {
//                                            console.log(data, '+++++Data+++++');
//                                            console.log(otherArray, '+++++OtherArray+++++');
                                            var dbData = {};
                                            data['others'] = '';
                                            for (var key in otherArray) {
                                                data['others'] += '"' + key + ":" + otherArray[key] + '", ';
                                            }
                                            
                                            data['popularity'] = Math.floor(Math.random() * 30);
                                            //save data in mysql db
                                            dbModel.saveCWData(data);
                                        });
                                    });

//                                    return data;
                                });

                            });
                        });
                    });

                });
            });
        }
        );
    } catch (e) {
        if (e !== BreakException)
            throw e;
    }
});
module.exports = router;
