var crypto = require('crypto');

var _md5 = function(text) {
    var md5 = crypto.createHash('md5');
    text = (text || '').toString();
    return md5.update(text).digest('base64');
};

module.exports = {
    md5: _md5
};