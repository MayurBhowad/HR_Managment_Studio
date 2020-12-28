const router = require('express').Router();
const bcrypt = require('bcryptjs');

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

module.exports = router;