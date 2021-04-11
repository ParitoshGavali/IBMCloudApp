const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.post('/login', controllers.loginmsg);
router.put('/addFunds', controllers.addbalancemsg);
router.get('/getBalance', controllers.getbalancemsg);

// router.post('/addBalance', function(req,res){
//     console.log(req.body);
//     res.status(200).json({
//         body : 'Hello from addBalance!',
//         amount : req.body.amount,
//         name : req.body.name,
//     });
// });

module.exports = router;