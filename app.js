let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');

const dish = require('./routes/dish');
var auth = require('./routes/auth');
const order = require('./routes/order')

let app = express();
let mongoose = require('mongoose');
let dbUSER = process.env.DB_USER || '';
let dbPass = process.env.DB_PASSWORD || '';

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb+srv://garlic:yaradrim1991@cluster0.3bgzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { promiseLibrary: require('bluebird'), useNewUrlParser: true  })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api/dish', dish);
app.use('/api/auth', auth);
app.use('/api/order', order);
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
