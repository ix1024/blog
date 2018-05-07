var express = require('express');
var router = express.Router();
var Item = require('../../model/item');
var promiseGlobalData = require('../../common/promise-global-data');

router.get('/', function(req, res, next) {
    if (req.session.user) {
        return res.redirect('/');
    }
    promiseGlobalData()
        .then(function(assign) {
            res.render('user/login.html', assign({
                title: 'Express'
            }));
        });

});

router.get('/logout', function(req, res, next) {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;