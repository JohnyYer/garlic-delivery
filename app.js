let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');

let book = require('./routes/book');
const dish = require('./routes/dish');
var auth = require('./routes/auth');



let app = express();
let mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://garlic:yaradrim1991@ds161411.mlab.com:61411/garlic', { promiseLibrary: require('bluebird'), useNewUrlParser: true  })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api/dish', dish);
app.use('/api/auth', auth);
app.use('*', express.static(path.join(__dirname, 'dist')))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// restful api error handler
app.use(function(err, req, res, next) {
  console.log(err);

  if (req.app.get('env') !== 'development') {
    delete err.stack;
  }

  res.status(err.statusCode || 500).json(err);
});

module.exports = app;
