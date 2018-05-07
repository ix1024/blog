var express = require('express');
var webutils = require('webutils');
var router = express.Router();
var Item = require('../../../model/item');

function cb(rs, a) {
    console.log(rs, a);
}
//Item.update({}, { name: '给开发者提供的 35 款 JavaScript 图形图表库' }, { multi: true }, cb)
router.get('', function (req, res, next) {

    Item.find().then(function (result) {
        result = result.map(function (item) {
            item.content = webutils.slice(webutils.trimHtml(item.content || ''), 50);
            return item;
        });
        res.send(result);
    }).catch(function (err) {
        next(err);
    });

});
/**
 * 添加
 */
router.post('', function (req, res, next) {

    var body = req.body;
    var name = body.name;
    var tags = body.tags;
    var content = body.content;
    if (!name || !content) {
        return res.sendData({
            success: false,
            message: '不能为空'
        });
    }
    var item = new Item({
        name: name,
        tags: tags,
        content: content
    });

    Item.findOne({ name: name })
        .then(function (result) {

            if (result) {
                return res.sendData({
                    result: name,
                    success: false,
                    message: '不能重复添加'
                });
            }

            item.save()
                .then(function (rs) {
                    return res.sendData({
                        message: '添加成功'
                    });
                });
        });
});
router.get('/:id', function (req, res, next) {
    Item.findOne({ _id: req.params.id }).then(function (result) {
        res.sendData({ result: result });
    });
});
router.delete('/:id', function (req, res, next) {
    Item.remove({ _id: req.params.id }).then(function (result) {
        res.sendData({ result: result });
    });
});
router.put('/:id', function (req, res, next) {
    var body = req.body;
    var name = body.name;
    var tags = body.tags;
    var content = body.content;
    if (!name || !content) {
        return res.sendData({
            success: false,
            message: '不能为空'
        });
    }
    Item.update({ _id: req.params.id }, { name: name, content: content, tags: tags }).then(function (result) {

        return res.sendData({ success: result.ok === 1, message: result.ok ? '保存成功' : '未知错误' });

    });
});
module.exports = router;