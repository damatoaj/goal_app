const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.get('/', authCtrl.landing);
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;