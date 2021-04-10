const cloudant = require('../cloudant/cloudantConnect')

const loginmsg = (req, res, next) => {
    console.log("login controller");
    console.log(req.body);
    res.status(200).json({
        body : 'Hello from to login!',
        username : req.body.username,
        password : req.body.password,
        success : true,
    });
};

const getbalancemsg = (req,res,next) => {
    console.log("get Balance controller");
    console.log(req.body);
    var balance = cloudant.getBalance(req.body.username,req.body.password);
    res.status(200).json({
        balance : balance
    });
}

const addbalancemsg = (req,res,next) => {
    console.log("Add balance controller");
    console.log(req.body);
    var newBalance = cloudant.addFunds(req.body.username,req.body.password,req.body.amount);
    res.status(200).json({
        balance : newBalance,
        username : req.body.username,
    });
}

module.exports.loginmsg = loginmsg;
module.exports.getbalancemsg = getbalancemsg;
module.exports.addbalancemsg = addbalancemsg;