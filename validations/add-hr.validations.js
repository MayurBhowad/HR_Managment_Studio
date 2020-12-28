const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateAddHrInputs = (data) => {
    let errors = {};

    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.cpassword = !isEmpty(data.cpassword) ? data.cpassword : '';
    data.dob = !isEmpty(data.dob) ? data.dob : '';
    data.hr_no = !isEmpty(data.hr_no) ? data.hr_no : '';
    data.permission = !isEmpty(data.permission) ? data.permission : '';

    //First name
    if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
        errors.first_name = 'Name must be between 2 to 30 charecters!';
    }

    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = 'First name is required!';
    }

    //last name
    if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
        errors.last_name = 'Name must be between 2 to 30 charecters!';
    }

    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Last name is required!';
    }

    //email
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is Invalid!'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    }

    //password
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required!'
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be atleast 6 charecters!'
    }

    //cpassword
    if (Validator.isEmpty(data.cpassword)) {
        errors.cpassword = 'confirm password!'
    }

    if (!Validator.equals(data.password, data.cpassword)) {
        errors.cpassword = 'Password must match!'
    }

    //dob

    if (!Validator.isDate(data.dob)) {
        errors.dob = 'Invalide Date'
    }

    if (Validator.isEmpty(data.dob)) {
        errors.dob = 'Date of Birth is required!'
    }


    //hr no
    if (!Validator.isNumeric(data.hr_no)) {
        errors.hr_no = 'Invalid!'
    }

    if (Validator.isEmpty(data.hr_no)) {
        errors.hr_no = 'Hr number is required!'
    }

    //permission
    if (Validator.isEmpty(data.permission)) {
        errors.permission = 'permission not defined!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}