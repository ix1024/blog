function sendData(options) {
    var obj = {
        timestamps: Date.now(),
        code: 200,
        success: true,
        message: null,
        result: null
    };
    options = options || {};
    for (var key in options) {
        obj[key] = options[key];
    }
    try {
        this.send(obj);
    } catch (error) {
        next(error);
    }
};
module.exports = function(req, res, next) {

    res.sendData = function() {
        sendData.apply(res, arguments);
    };

    next();
};