const lodash = require('lodash');
var Site = require('../model/site');
const config = require('../config');
let DATA = null;

// var site = new Site({
//     title: '大前端',
//     keywords: '大前端技术',
//     description: 'description info',
//     logo: 'http://www.tcctw.com/logo.png'
// });
// site.save().then(function (res) {
//     console.log(res);
// });

const globalData = function () {

    if (DATA) {
        return Promise.resolve(DATA);
    } else {
        return new Promise(function (resolve, reject) {

            Site.findOne()
                .then(function (siteInfo) {
                    siteInfo = siteInfo || {};

                    var assign = function (options) {
                        return lodash.assign(
                            {
                                name: config.name,
                                description: config.description
                            },
                            {
                                name: siteInfo.title,
                                logo: siteInfo.logo,
                                keywords: siteInfo.keywords,
                                description: siteInfo.description
                            },
                            options)
                    };
                    DATA = assign;
                    resolve(assign);
                });

        });
    }

};


module.exports = globalData;
