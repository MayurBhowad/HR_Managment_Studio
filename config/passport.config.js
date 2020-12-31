const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
// const HR = mongoose.model('hrs');
const HR = require('../db/models/hr.model');

const keys = require('../config/keys.config');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.SECRET_OR_KEY;
console.log(process.env.NODE_ENV);

module.exports = passport => {
    passport.use('jwts', new JwtStrategy(opts, (jwt_payload, done) => {
        HR.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            }).catch(err => console.log(err));
    }))
}

