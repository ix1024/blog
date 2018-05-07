const express = require('express');
const request = require('request');
const path = require('path');
const favicon = require('serve-favicon');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const webutils = require('webutils');
const expressSession = require('express-session');
const dynamicRoute = require('./common/dynamic-route');
const middleware = require('./common/middleware');
const config = require('./config');

const app = express();

nunjucks.configure('views', {
    noCache: true,
    autoescape: true,
    express: app
});
process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');

/**
 * 连接数据库
 */

const mongoose = require('mongoose');
const mongooseOptions = {
    //useMongoClient: true,
    autoIndex: true, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
mongoose
    .connect(config.mongodb.url, mongooseOptions)
    .then(function() {
        webutils.info('Good lunk! The db was connected!');
    })
    .catch(function(err) {
        webutils.error('Oh no database error', err);
    });

/**
 * 持久化保存
 */
const Store = expressSession.Store;
const MongooseStore = require('mongoose-express-session')(Store);
const store = new MongooseStore({
    connection: mongoose /* configuration */
});
app.use(expressSession({
    secret: 'kingwell.leng',
    resave: false,
    rolling: false,
    cookie: {
        maxAge: 10000000000
    },
    saveUninitialized: true,
    store: store
}));



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(middleware);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname,'../dist')));


/**
 * 根据文件自动设置路由
 */
dynamicRoute({
    dev: true,
    routerPath: './routes',
    app: app,
    filter: function(path) {
        path = path.replace('/admin/index', '/admin');
        path = path.replace('/api/captcha', '/captcha');
        //path = path.replace('/pages/item', '/item');
        path = path.replace(/^\/pages/ig, '');
        path = path.replace(/^\/index$/ig, '/');
        return path;
    }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('common/error.html', {
        title: config.title
    });
});

module.exports = app;