const router = require('express').Router();
const verifyToken = require('./verify');

router.get('/dashboard', verifyToken, (req, res) => {
    res.status(200).send({ message: 'Successfully logged in!' }); 
});

module.exports = router;