const User = require('../models/user');

const landing = (req, res) => {
    console.log('landing page')
    res.send('landing page')
};

const signup = (req, res) => {
    console.log('sign up');
    res.send('signup')
};

const login = (req, res) => {
    console.log('login');
    res.send('login')
};

module.exports = {
    landing,
    signup,
    login
};