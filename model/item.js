const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


const item = mongoose.Schema({
    // id: ObjectId,
    name: String,
    content: String,
    tags: String,
    thumbnail: String,
    author: String,
    read: Number,
    share: Number,
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
});


module.exports = mongoose.model('item', item);