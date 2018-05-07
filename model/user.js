const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


const user = mongoose.Schema({
    // id: ObjectId,
    userName: String,
    password: String,
    avatar: String,
    email: String,
    mobile: Number,
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('user', user);