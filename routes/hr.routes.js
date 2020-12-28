const router = require('express').Router();

router.get('/testing', (req, res) => {
    res.send('hr routes passes!')
})

module.exports = router;