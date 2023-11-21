var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

// 引用路由模块

var indexRouter = require('./routes/index');
var changeRouter = require('./routes/change');
var regRouter = require('./routes/reg');
var loginRoter = require('./routes/login');
var findallRoter = require('./routes/findall');
var findoneRoter = require('./routes/findon');
var findvalueRoter = require('./routes/findvalue');
var addressallRoter = require('./routes/addressall');


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 中间件 app.use(路径, 路由)
app.use('/', indexRouter);
// 修改密码 username password
app.use('/change', changeRouter);
//注册 username password
app.use('/reg', regRouter);
//登录 username password
app.use('/login', loginRoter);
// 查询全部商品 appkey
app.use('/findall', findallRoter);
//通过sid查找特定的商品 appkey sbhyz
app.use('/findone', findoneRoter);
// 通过value查找特定商品组 appkey value
app.use('/findvalue', findvalueRoter);
// 查找全部地址 appkey token
app.use('/addressall', addressallRoter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;