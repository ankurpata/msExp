var db = require('../config/db.js');
var commonApis = require('../constants/common');

//
//if (!db) {
//    db.connect(function (err) {
//        if (!err) {
//            console.log("Database is connectedd.");
//        } else {
//            console.log("Error connecting databases.");
//        }
//    });
//}

var getWhat = () => {
    var what = ['make', 'model', 'max(color) as maxColor ', 'sum(popularity) as popSum', 'GROUP_CONCAT( DISTINCT make_url) as make_url', 'GROUP_CONCAT( DISTINCT model_url) as model_url',
        'max(img_url) as img_url', 'GROUP_CONCAT( DISTINCT domain) as domain',
        'GROUP_CONCAT( DISTINCT domain_unique_id) as domain_unique_id', 'round(AVG(price)) as price',
        'GROUP_CONCAT("name:", variant,";url:", variant_url, ";transmission_type:", transmission_type, ";fuel_type:" , fuel_type, ";displacement:" , displacement, ";price:" , price) as variant_details '];
//    var what = ['*'];
    var retWhat = "";

    if (what) {
        retWhat += what.map(function (elem) {
            return elem;
        }).join(", ");
    }
    return retWhat;
};

var getClause = (arr, type) => {
    if (type === 'others' || type === 'make' || type === 'model' || type === 'color') {
        console.log(arr);
        var clause = " ( " + arr.map(function (elem) {
            return type + " like '%" + elem.trim() + "%'";
        }).join(" OR ") + " ) ";
        return clause;
    }
    var clause = arr.map(function (elem) {
        return elem.trim();
    }).join("' , '");
    var rclause = '';
    if (arr.length > 1) {
        rclause = type + " IN ('" + clause + "')";
    } else {
        rclause = type + "= '" + arr[0] + "'";
    }
    return rclause;
};

var getWhereStr = (data) => {
    var where = [];
    var retWhere = "";
    if (data['make'] || data['model'] || data['variant']) {
        var whereMake = [];
        if (data['make']) {
            whereMake.push(getClause(data['make'], 'make'));
        }
        if (data['model']) {
            whereMake.push(getClause(data['model'], 'model'));
        }
        if (data['variant']) {
            whereMake.push(getClause(data['variant'], 'variant'));
        }
        if (whereMake) {
            where.push(" ( " + whereMake.map(function (elem) {
                return elem;
            }).join(" OR ") + " ) ");
        }
    }
    if (data['fuel_type']) {
        where.push(getClause(data['fuel_type'], 'fuel_type'));
    }
    if (data['transmission_type']) {
        where.push(getClause(data['transmission_type'], 'transmission_type'));
    }
    if (data['body_type']) {
        where.push(getClause(data['body_type'], 'body_type'));
    }
    if (data['color']) {
        where.push(getClause(data['color'], 'color'));
    }
    if (data['seating_capicity']) {
        where.push(getClause(data['seating_capicity'], 'seating_capicity'));
    }
    if (data['price_min']) {
        where.push("price >= " + data['price_min'] + "");
    }
    if (data['price_max']) {
        where.push("price <= " + data['price_max'] + "");
    }
    if (data['others']) {
        where.push(getClause(data['others'], 'others'));
    }
      
    if (where.length > 0) {
        retWhere += "WHERE " + where.map(function (elem) {
            return elem;
        }).join(" AND ");
    }

//    console.log(retWhere, 'retWhere');
    return retWhere;
};


var getH1 = (urlStr) => {
    var h1 = 'New Cars in India';
    if (urlStr && urlStr != 'newcars' && urlStr != '#') {
        h1 = urlStr.replace(/-/g, " ");
    }
    return commonApis.titleCase(h1);
}
var getDesc = (urlStr) => {
    var h1 = 'New Cars in India';
    if (urlStr && urlStr != 'newcars' && urlStr != '#') {
        h1 = urlStr.replace(/-/g, " ");
    }
    return commonApis.titleCase(h1);
}
var getQuery = (what, where, pageNo, domainIds) => {
    if(!domainIds){
        domainIds = [1, 2, 3, 4, 5, 6];
    }
    if (!where) {
        where = " WHERE ";
    } else {
        where += ' AND ';
    }
    var sql = domainIds.map(function (elem) {
        return "(SELECT " + what + " FROM nc_cars " + where + ' domain_unique_id = ' + elem + " GROUP BY make, model ORDER BY popSum DESC LIMIT " + (pageNo * 4) + ', 8' + " )";
    }).join(" UNION ALL ");
    console.log(sql, '---sqll--');
    return sql;
};
var searchCars = (data, res, callback) => {
    var where = getWhereStr(data);
    var what = getWhat();
//    console.log(getQuery(what, where, data['pageNo']), " : Query");

    db.query(getQuery(what, where, data['pageNo'],  data['domain_unique_id'] ? data['domain_unique_id']: null ), function (err, result, fields) {
        if (err) {
            throw err;
        }

        var response = {};
        response.carlist = result;
        db.query("SELECT  count(distinct model, domain) as total_count from nc_cars " + where, function (err, result2, fields) {
            if (err) {
                throw err;
            }
            var numRows = result2[0].total_count;
            console.log(numRows, '-numRows--numRows')
            var heading = {};
            heading.h1Text = getH1(data['urlStr']);
            heading.h2Text = commonApis.getIndianFormat(numRows) + " new car listings found across 6 different platforms.";
            heading.metaTags = {
                title: getH1(data['urlStr']) + " | Get discount upto 10% | Best Price Guaranteed",
                //            canonical: "new Canonical dynamic",
                description: (result.length ? commonApis.getTime() + ' - ' + commonApis.getIndianFormat(numRows) +
                        " cars listings found | New Car Prices | Get details for " +
                        result[0]['make'] + " " + result[0]['model'] + " " + result[0]['domain'].toUpperCase() 
                        : commonApis.getTime() + " - " + "No listings found for " + getH1(data['urlStr'])),
                keywords: getH1(data['urlStr']) + ", new cars, carwale, cardehko",
            };

            response.heading = heading;
            var guideTmpArr = [];
            guideTmpArr.push({id: 'petrol', label: 'Petrol', type: 'fuel_type'}, {id: 'diesel', label: 'Diesel', type: 'fuel_type'},
                    {id: 'manual', label: 'Manual', type: 'transmission_type'}, {id: 'Automatic', label: 'Automatic', type: 'transmission_type'},
                    {id: 'sedan', label: 'Sedan', type: 'body_type'}, {id: 'hatchback', label: 'Hatchback', type: 'body_type'},
                    {id: 'tata', label: 'Tata', type: 'make'}, {id: 'audi', label: 'Audi', type: 'make'},
                    {id: 'tiago', label: 'Tiago', type: 'model'}, {id: 'swift', label: 'Swift', type: 'model'},
                    {id: 'disk brakes', label: 'Disk Brakes', type: 'others'}, {id: 'power windows', label: 'Power Windows', type: 'others'},
                    {id: 'fog lights', label: 'Fog Lights', type: 'others'}, {id: 'airbags', label: 'Airbags', type: 'others'}
            );
            response.guideTmpArr = guideTmpArr;
            callback(response);
        });

    });
};

// Functions which will be available to external callers
exports.searchCars = searchCars;
