var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


// var port = 5000;
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds161529.mlab.com:61529/pixels');


var index = require('./routes/index');
var drawingsRouter = require('./routes/drawings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Change the HTTP 'method' of the request to handle PUT and DELETE requests if they are sent in the _method property of a form
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));


app.use('/', index);
app.use('/drawings', drawingsRouter);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, () => {
  console.log("The app is running on Port 3000 BITCH!");
});

module.exports = app;
