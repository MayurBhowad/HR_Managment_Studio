const router = require('express').Router();


//@route    GET /emp/testing
//@desc     Test emp route
//@access   Public
router.get('/testing', (req, res) => {
    res.send('emp route passes!')
})

module.exports = router;