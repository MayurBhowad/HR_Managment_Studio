const mongoose = require('mongoose');

const DB_URI = require('../config/keys.config').MONGO_URI;

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
    return mongoose.disconnect();
}


module.exports = { connect, close };