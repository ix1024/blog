var express = require('express');
var router = express.Router();
var Item = require('../../../model/item');
var promiseGlobalData = require('../../../common/promise-global-data');
var webutils = require('webutils');
router.get('/', function (req, res, next) {

    promiseGlobalData()
        .then(function (assign) {
            Item
                .find()
                .where('createTime')
                .then(function (docs) {

                    res.render('admin/index.html', assign({
                        title: 'Express',
                        items: docs
                    }));
                });
        });


});

module.exports = router;