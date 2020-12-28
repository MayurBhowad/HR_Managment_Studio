const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/hr/', require('./routes/hr.routes'));
app.use('/emp/', require('./routes/emp.routes'));

module.exports = app;