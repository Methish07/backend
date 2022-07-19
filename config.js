const mysql=require('mysql');
let mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'hello',
    database:'insta'
});
mysqlConnection.connect((err)=>{
    if(err){
        console.log(JSON.stringify(err,undefined,2));
    }
    else{
        console.log("db connected successfully");
    }
});
const JWT_SECRET="abdhajnk167i1nk82019io";
module.exports={mysqlConnection,JWT_SECRET};
