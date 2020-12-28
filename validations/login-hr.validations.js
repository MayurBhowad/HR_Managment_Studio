const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateLoginHrInput = data => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.passport = !isEmpty(data.passport) ? data.passport : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email iis Invalid!';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is Requird!'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'password Field is requird!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}