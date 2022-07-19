const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config');
const {mysqlConnection}=require('../config')

const requestLogin=(req,res,next)=>{
const {authorization}=req.headers;
if(!authorization){
  return  res.status(401).json({error:"you must be logged in"});
}
else{
    const token=authorization.replace("Bearer","");
    console.log(token);
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
           return res.status(401).json({error:"ypu must be logged in"});
        }
        else{
            const {_id}=payload;
            console.log(_id);
            mysqlConnection.query('select * from User where id=?',[_id],(err,rows,feilds)=>{
                if(!err){
                    req.user=rows[0];
                   next();
                }
            })

        }
    })

}
}
module.exports=requestLogin;