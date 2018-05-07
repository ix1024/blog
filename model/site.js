const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


const site = mongoose.Schema({
    // id: ObjectId,
    name: String,
    title: String,
    keywords: String,
    description: String,
    logo: String,
    remark: String,
    thumbnail: String,
    author: String,
    read: Number,
    share: Number,
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
});


module.exports = mongoose.model('site', site);