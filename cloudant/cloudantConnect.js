const Cloudant = require("@cloudant/cloudant");
const json = require("body-parser/lib/types/json");
const localDatabasePath = "./database/account.json";
const fs = require('fs');
const databaseName = "cloud_database";
var cloudant;
var database,accounts,_id,_rev
var localdata;

async function cloudantConnect(){
    
    console.log("connecting to Cloudant..");
    try {
        cloudant = Cloudant({
            url : "https://5d854627-6e9b-4694-90c5-3fa91b4ca59a-bluemix.cloudantnosqldb.appdomain.cloud",
            plugins : {
                iamauth : {
                    iamApiKey : "n5sKpwDMtSxuAM8bPT5_AtI3pZD7ziZ8uUTff9KWd0mq",
                },
            },
        });
        console.log("successfully connected to Cloudant");
        console.log("connecting to database..");
        try {
            var allDBs = await cloudant.db.list();
            
            if(allDBs.indexOf(databaseName)==-1){
                console.log("database not found!");
            }
            else {
                database = cloudant.db.use(databaseName);
                console.log("Connected to database!");
                
                console.log("fetching data from database..");
                databaseData = await database.list(databaseName,{include_docs:true});
                docID = await databaseData["rows"][0]["id"];
                accounts = await database.get(docID);
                console.log("Succecssfully fetched!");
                
                console.log("Updataing local database..");
                for(var key in accounts){
                    if(key=="_id"){
                        _id = accounts[key];
                    }else if(key=="_rev"){
                        _rev = accounts[key];
                    }else {
                        localdata = accounts[key];
                    }
                }
                // console.log(localdata);
                fs.writeFileSync(localDatabasePath,JSON.stringify(localdata,null,4),'utf8',(err)=>{
                    if (err) {
                        console.log(`Error writing file: ${err}`);
                    }
                });
                console.log("local database updated!");
            }
        } 
        catch(e) {
            console.log("Error!!");
            console.log(e);
        }
    }
    catch {
        console.log("Error in conencting to Cloudant");
    }
};

function getBalance(username,password){
    console.log("get balance");
    for(i in localdata){
        console.log("%s %s",localdata[i].username,localdata[i].password)
        if(localdata[i].username == username){
            if(localdata[i].password == password){
                console.log("entry found!");
                return localdata[i].balance;
            }
        }
    }
    console.log("No entry found!");
    return -1;
};

function addFunds(username,password,funds){
    var temp;
    for(i in localdata){
        if(localdata[i].username === username){
            if(localdata[i].password === password){
                localdata[i].balance += funds;
                temp = localdata[i].balance;
            }
        }
    }

    console.log("wrting to local database");
    fs.writeFile(localDatabasePath,JSON.stringify(localdata,null,4),'utf8',(err)=>{
        if(err){
            console.log(`Error writing in local database : ${err}`);
        }
    });

    console.log("writing to cloudant");
    pushData();

    return temp;
};

async function pushData(){
    try {
        await database.insert({
            _id:_id,
            _rev:_rev,
            data:localdata,
        });
        console.log("data successfully pushed!");
    }
    catch(e){
        console.log("Error %s",e);
    }
}

module.exports = {
    cloudantConnect,
    getBalance,
    addFunds,
};
