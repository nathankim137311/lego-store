const router = require('express').Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/User');
const { registerValidation } = require('../validation/validation');

router.post('/register', async (req, res) => {
    // Validate data before we add user 
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user already exists 
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists'); 

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt); 

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    try {
        const savedUser = await user.save(); 
        res.send({ user: user._id }); 
    } catch(err) {
        res.status(400).send(err); 
    }
});

module.exports = router;