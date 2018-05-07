var express = require('express');
var router = express.Router();
var User = require('../../model/user');
var utils = require('../../common/utils');

router.get('', function(req, res, next) {

    User.find().then(function(result) {
        res.sendData({
            result: result
        });
    }).catch(function(err) {
        next(err);
    });

});

router.post('', function(req, res, next) {
    var body = req.body;
    var userName = body.userName || '';
    var password = body.password || '';
    var captcha = body.captcha || '';
    var code = body.code || '';

    if (req.session.captcha !== utils.md5(captcha)) {
        return res.sendData({ success: false, message: '验证码错误' });
    }


    if (userName.length < 6 || password.length < 6) {
        return res.sendData({
            success: false,
            message: '不合法'
        });
    }

    User.findOne({ userName: userName, password: utils.md5(password) })
        .then(function(result) {

            if (result) {
                req.session.user = {
                    userName: result.userName
                };
                res.sendData({
                    message: '登录成功'
                });
            } else {
                res.sendData({
                    success: false,
                    message: '登录失败'
                });
            }
        })
        .catch(function(err) {
            res.sendData({ message: err });
        })

});
module.exports = router;