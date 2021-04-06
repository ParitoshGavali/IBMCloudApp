const loginmsg = (req, res, next) => {
    console.log("login controller");
    console.log(req.body);
    res.status(200).json({
        body : 'Hello from to login!',
        name : req.body.name,
        password : req.body.password,
        success : true,
    });
};

const getbalancemsg = (req,res,next) => {
    console.log("get Balance controller");
    console.log(req.body);
    res.status(200).json({
        body : 'Hello from getBalance!',
        name : req.body.name,
        password : req.body.password,
        balance : 10000,
    });
}

const addbalancemsg = (req,res,next) => {
    console.log("Add balance controller");
    console.log(req.body);
    res.status(200).json({
        body : 'Hello from addBalance!',
        amount : req.body.amount,
        name : req.body.name,
    });
}

module.exports.loginmsg = loginmsg;
module.exports.getbalancemsg = getbalancemsg;
module.exports.addbalancemsg = addbalancemsg;