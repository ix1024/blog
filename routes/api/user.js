var express = require('express');
var router = express.Router();
var User = require('../../model/user');
var utils = require('../../common/utils');

router.get('', function(req, res, next) {

    User.find()
        .then(function(result) {
            res.sendData({ result: result });
        })
        .catch(function(err) {
            res.sendDate({ message: err });
        });

});

router.get('/clear', function(req, res, next) {

    User.remove()
        .then(function(result) {
            res.sendData({ result: result });
        })
        .catch(function(err) {
            res.sendDate({ message: err });
        });

});

module.exports = router;