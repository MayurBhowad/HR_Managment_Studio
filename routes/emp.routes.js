const router = require('express').Router();

router.get('/testing', (req, res) => {
    res.send('emp route passes!')
})

module.exports = router;