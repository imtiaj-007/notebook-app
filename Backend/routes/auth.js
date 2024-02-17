const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Users = require('../models/users');
const fetchUser = require('../middlewares/auth');
const router = express.Router();
const secretKey = "$check@2024$";

// Create a User using : POST "/api/auth". No login required
router.post('/signup', [check('name', 'Enter a valid name').notEmpty(),
                       check('email', 'Enter a valid email').isEmail(),
                       check('password', 'Password must be atleast 6 characters').isLength({ min: 6 })], async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const user = await Users.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            error: "User with this mail id already exists",
        })
    }

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt);

    Users.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass
    })
        .then((user) => {
            const token = jwt.sign({ ...user }, secretKey);
            return res.json({
                apiToken: token
            })
        })
        .catch((err) => {
            console.log("Internal Server Error");
            res.status(500).send({
                error: "Some error occured",
                message: err.message
            })
        });
})

router.post('/login', [check('email', 'Enter a valid email').isEmail()], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if(!user){
            return res.status(404).json({ error: "Invalid Credentials"});
        }

        const passMatch = bcrypt.compare(password, user.password);
        if(!passMatch){
            return res.status(404).json({ error: "Invalid Credentials"});
        }

        const token = jwt.sign({ ...user }, secretKey);
        return res.json({
            apiToken: token
        })

    } catch (err) {
        console.log("Internal Server Error");
        res.status(500).send({
            error: "Some error occured",
            message: err.message
        })
    }
})

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user._doc._id;
        const user = await Users.findById(userId).select("-password");
        res.json(user);

    } catch (err) {
        console.log("Internal Server Error");
        res.status(500).send({
            error: "Some error occured",
            message: err.message
        })
    }
})

module.exports = router;