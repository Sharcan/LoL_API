const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/account.controller');

router.post('/account', AccountController.addAccount);
router.post('/authenticate', AccountController.authenticate);

module.exports = router;