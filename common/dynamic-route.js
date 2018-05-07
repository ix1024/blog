var path = require('path');
var fs = require('fs');
var lodash = require('lodash');
var reg = RegExp('\\\\', 'ig');



function getFiles(p) {
    var list = [];

    function get(p) {
        fs.readdirSync(p).forEach(function(item, index) {
            var _p = path.join(p, item);

            if (fs.statSync(_p).isFile()) {
                list.push(_p);
            } else if (fs.statSync(_p).isDirectory()) {
                get(_p);
            }
        });
    }
    get(p);
    return list;
}


var dynamicRoute = function(options) {
    var ops = lodash.assign({
        debug: false,
        app: null,
        routerPath: './routes',
        filter: function(str) {
            return str;
        }
    }, options);
    //console.log(ops);
    if (!ops.app) {
        return;
    }
    getFiles(ops.routerPath).forEach(function(item) {
        var pItem;
        if (item.indexOf('.js') === -1) {
            return;
        }
        pItem = item.slice(item.indexOf('routes') + 6, -3);
        pItem = pItem.replace(reg, '/');
        item = './' + item.replace(reg, '/');
        if (ops.dev) {
            console.log('\nBefore::Router Path==>', pItem);
        }
        pItem = ops.filter(pItem);
        ops.app.use(pItem, require(path.join(process.cwd(), item)));
        if (ops.dev) {
            console.log('Router Path==>', pItem, item);
        }

    });

};
module.exports = dynamicRoute;