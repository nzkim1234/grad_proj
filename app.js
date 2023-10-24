const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const connectRouter = require('./routes/connect');
const vitaminRouter = require('./routes/vitamin');
const showProfileRouter = require('./routes/showProfile');
const sendImageRouter = require('./routes/sendImage');
const alarmRouter = require('./routes/alarm');
const deviceRouter = require('./routes/device');
const boxRouter = require('./routes/box');
const app = express();
const db = require('./config/config')
require('dotenv').config();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
// view engine setup
app
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'pug')
.use(logger('dev'))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use(cookieParser())
.use(express.static(path.join(__dirname, 'public')));

db.query('SELECT * FROM users', (err, row) => {
  if (err) {
    db.query(`CREATE TABLE users (
      seq int NOT NULL AUTO_INCREMENT,
      name varchar(45) NOT NULL,
      birth int NOT NULL,
      gender tinyint NOT NULL,
      id varchar(45) NOT NULL,
      pw varchar(500) NOT NULL,
      default_img varchar(45) DEFAULT 'default_image',
      serial_id bigint DEFAULT NULL,
      created_time datetime DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (seq,id),
      UNIQUE KEY seq_UNIQUE (seq),
      UNIQUE KEY id_UNIQUE (id),
      UNIQUE KEY serial_num_UNIQUE (serial_id)
    )`, (err, row) => {
      if (err) {
        console.log(err);
      }
    })
  }
});

app
.use('/', indexRouter)
.use('/users', usersRouter)
.use('/register', registerRouter)
.use('/login', loginRouter)
.use('/connect', connectRouter)
.use('/vitamin', vitaminRouter)
.use('/showprofile', showProfileRouter)
.use('/sendimage', sendImageRouter)
.use('/alarm', alarmRouter)
.use('/device', deviceRouter)
.use('/box', boxRouter);

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
