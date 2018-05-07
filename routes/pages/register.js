var express = require('express');
var router = express.Router();
var Item = require('../../model/item');
var promiseGlobalData = require('../../common/promise-global-data');

router.get('/', function(req, res, next) {

    promiseGlobalData()
        .then(function(assign) {
            res.render('user/register.html', assign({
                title: 'Express'
            }));
        });


});

module.exports = router;