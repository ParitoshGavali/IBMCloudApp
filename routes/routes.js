const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.post('/login', controllers.loginmsg);
router.post('/addFunds', controllers.addbalancemsg);
router.post('/getBalance', controllers.getbalancemsg);

module.exports = router;