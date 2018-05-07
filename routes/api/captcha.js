const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../../config');

/**
 * 验证码
 */
router.get('', function(req, res, next) {

    request
        .get(config.captcha)
        .on('response', function(rs) {
            var captcha = rs.headers['x-tag']
            req.session.captcha = captcha;
        })
        .pipe(res);

});
module.exports = router;