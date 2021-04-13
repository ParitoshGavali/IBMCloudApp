const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.post('/login', controllers.loginmsg);
router.post('/addFunds', controllers.addbalancemsg);
router.post('/getBalance', controllers.getbalancemsg);
router.put('/addFunds', controllers.addbalancemsg);
router.get('/getBalance', controllers.getbalancemsg);


module.exports = router;