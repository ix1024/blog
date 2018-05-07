var express = require('express');
var router = express.Router();
var User = require('../../model/user');
var utils = require('../../common/utils');

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
    if (code !== '2017') {
        return res.sendData({
            success: false,
            message: '授权码错误'
        });
    }

    User.findOne({ userName: userName })
        .then(function(result) {

            if (!result) {
                var user = new User({
                    userName: userName,
                    password: utils.md5(password)
                });

                user.save()
                    .then(function(result) {
                        req.session.captcha = null;
                        res.sendData({ result: result, message: '添加成功' });
                    })
                    .catch(function(err) {
                        res.sendData({ message: err });
                    });
            } else {
                res.sendData({ success: false, message: '已经存在' });
            }

        })
        .catch(function(err) {
            res.sendData({ message: err });
        });



});

module.exports = router;