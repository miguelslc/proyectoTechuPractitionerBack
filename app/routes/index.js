const router = require('express').Router();
const account = require('./api/account');
const movements = require('./api/movements');
const users = require('./api/users');

router.use('/api/account', account);
router.use('/api/movements', movements);
router.use('/api/users', users);

module.exports = router;