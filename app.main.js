const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


app.use('/hr/', require('./routes/hr.routes'));
app.use('/emp/', require('./routes/emp.routes'));

module.exports = app;