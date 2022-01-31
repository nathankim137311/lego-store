const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation/validation');

router.post('/register', async (req, res) => {
    // Validate data before we add user 
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    // Checking if user already exists 
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({ error: 'Email already exists'}); 

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt); 

    // Create a new user
    const user = new User({
        email: req.body.email,
        password: hashPassword,
        country: req.body.country,
    });

    try {
        await user.save();
        res.status(201).json(user); 
    } catch(err) {
        res.status(400).send(err); 
    }
});

// LOGIN 
router.post('/login', async (req, res) => {
    // Validate data before we login 
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    // Checking if user already exists 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ error: 'Email doesn\'t exist' }); 

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ error: 'Invalid password' });

    // Create and assign a token 
    const token = jwt.sign({ _id: user._id, email: req.body.email }, process.env.TOKEN_KEY, { expiresIn: "2h",});
    res.header('auth-token', token).status(200).send({ token: token }); 
})

module.exports = router;