const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../config/keys.config');

//DATABSE
const HR = require('../db/models/hr.model');

//Validations
const ValidateAddHrInputs = require('../validations/add-hr.validations');


//@route    GET /hr/testing
//@desc     Test hr route
//@access   Public
router.get('/testing', (req, res) => {
    res.send('hr routes passes!')
})

//@route    POST /hr/add
//@desc     Add new hr 
//@access   private
router.post('/add', (req, res) => {
    const { errors, isValid } = ValidateAddHrInputs(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    let added_by = req.body.added_by;

    HR.findOne({ _id: added_by })
        .then(hr => {
            if (hr.permission !== 'admin') {
                res.status(400).json({ message: 'Not Authorized!' })
            }
            addHr();
        })

    const addHr = () => {
        HR.findOne({ hr_no: req.body.hr_no })
            .then(hr => {
                if (hr) {
                    errors.hr_no = 'hr with this number already added!'
                    res.status(400).json(errors);
                } else {

                    let newHr = new HR({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: req.body.password,
                        dob: req.body.dob,
                        hr_no: req.body.hr_no,
                        permission: req.body.permission,
                    });

                    bcrypt.genSalt(10, ((err, salt) => {
                        bcrypt.hash(newHr.password, salt, (err, hash) => {
                            if (err) throw err;
                            newHr.password = hash;
                            newHr.save()
                                .then(hr => res.status(200).json(hr))
                                .catch(err => console.log(err));
                        })
                    }))
                }
            })
    }
})

//@route    POST /hr/change_password
//@desc     change hr password 
//@access   private

//@route    POST /hr/login
//@desc     login as hr 
//@access   public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    HR.findOne({ email })
        .then(hr => {
            if (!hr) {
                return res.status(404).json({ message: "User not found!" });
            }
            bcrypt.compare(password, hr.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: hr.id, first_name: hr.first_name, email: hr.email };
                        //sign token
                        jwt.sign(
                            payload,
                            keys.SECRET_OR_KEY,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            })
                    } else {
                        return res.status(400).json({ message: 'password incorrect!' })
                    }
                })
        })
})

//@route    GET hr/current
//@dest     Return Current User
//@access   Private
router.get('/current', passport.authenticate('jwts', { session: false }), (req, res) => {
    // console.log('get./current from users.js');
    res.json({
        id: req.user.id,
        Name: req.user.first_name,
        Email: req.user.email
    });
});


module.exports = router;