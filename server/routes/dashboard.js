const router = require('express').Router();
const verifyToken = require('./verify');

router.get('/dashboard', verifyToken, (req, res) => {
    res.status(200); 
});

module.exports = router;