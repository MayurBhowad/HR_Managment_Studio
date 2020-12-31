const mongoose = require('mongoose');
const HR = require('./models/hr.model');

const DB_URI = require('../config/keys.config').MONGO_URI;
// const DB_URI = 'mongodb://localhost:27017/StackHack_2_0_test';

const connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((res, err) => {
                if (err) return reject(err);
                resolve();
            })
    })
}

const close = () => {
    return mongoose.connection.close();
}

const dropHrCollection = () => {
    return HR.remove({ "email": { $nin: ["nick@gmail.com"] } });
}


module.exports = { connect, close, dropHrCollection };