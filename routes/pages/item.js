var express = require('express');
var router = express.Router();
var Item = require('../../model/item');
var promiseGlobalData = require('../../common/promise-global-data');
var webutils = require('webutils');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//request('http://pics.sc.chinaz.com/files/pic/moban/201801/moban2649.jpg')
//.pipe(fs.createWriteStream('../uploads/doodle.png'))


// request.get('http://www.yixieshi.com/109169.html', function (response, body) {
//   console.log(body)
//   $ = cheerio.load(body.body);
//   console.log($('.article-content').find('img').attr('data-lazy-src'));
//   var item = new Item({
//     // id: ObjectId,
//     name: '奇葩变了',
//     content: $('.article-content').html(),
//     thumbnail: $('.article-content').find('img').attr('data-lazy-src'),
//     //author: String,
//     //read: Number,
//     //share: Number,
//     //createDate:,
//     //updateDate: 
//   });
//   item.save().then(function (doc) {
//     console.log(doc);
//   });
// });

router.get('/', function(req, res, next) {
    promiseGlobalData()
        .then(function(assign) {
            Item
                .find()
                .where('createTime')
                .then(function(docs) {

                    res.render('item/items.html', assign({
                        title: 'Item',
                        baseUrl: req.baseUrl,
                        items: docs
                    }));
                });
        });


});
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    promiseGlobalData()
        .then(function(assign) {
            Item
                .findById(id)
                .then(function(doc) {
                    res.render('item/item.html', assign({
                        title: 'Item',
                        item: doc
                    }));
                });
        });
});

module.exports = router;