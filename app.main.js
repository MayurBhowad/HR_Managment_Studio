const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport')
//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport.config')(passport);

app.use('/hr/', require('./routes/hr.routes'));
app.use('/emp/', require('./routes/emp.routes'));

module.exports = app;