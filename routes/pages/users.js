var express = require('express');
var router = express.Router();
var Item = require('../../model/item');
var promiseGlobalData = require('../../common/promise-global-data');

router.get('/', function (req, res, next) {

  promiseGlobalData()
    .then(function (assign) {
      Item
        .find()
        .where('createTime')
        .then(function (docs) {
          res.render('hoem/index.html', assign({ title: 'User' }));
        });
    });


});

module.exports = router;
