const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { createUserToken } = require('../middleware/auth');

const landing = (req, res) => {
    console.log('landing page')
    res.send('landing page')
};

const signup = async (req, res) => {
    try{
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        });
        const token = await createUserToken(req, user)
        user.save();
       res.status(201).send({token, user})
    } catch(e) {
        res.status(500).send();
    }
};

const login = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(404).send("Try another email");
        const token = await createUserToken(req, user);
        res.status(201).send({token, user})
    } catch(e) {
        res.status(400).send();
    }
};

const update = async (req, res) => {
    console.log(req.user)
    try {
        const user = await User.findByIdAndUpdate(req.user._id, { name: req.body.name })
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(500).send();
    }
};

module.exports = {
    landing,
    signup,
    login,
    update
};