var express = require('express');
var router = express.Router();
const Index = require('../controllers/index.controller');

/* GET home page. */
router.get('/test', Index.testConnection);

module.exports = router;
