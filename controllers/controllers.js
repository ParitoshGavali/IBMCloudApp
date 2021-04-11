const cloudant = require('../cloudant/cloudantConnect')

const loginmsg = (req, res, next) => {
    console.log("login controller");
    console.log(req.body);
    var check = cloudant.login(req.body.username,req.body.password);
    if (check == false){
        res.status(200).json({
            valid : check
        });
    } else {
        res.status(200).json({
            name : check,
            valid : true
        });
    }
};

const getbalancemsg = (req,res,next) => {
    console.log("get Balance controller");
    console.log(req.body);
    var balance = cloudant.getBalance(req.body.username,req.body.password);
    console.log("balance : %d",balance);
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