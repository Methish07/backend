const express=require('express');
const router=express.Router();
const requestLogin=require('../middleware/requestLogin');
const {mysqlConnection}=require('../config');

router.post('/createpost',requestLogin,(req,res)=>{
    const {title,body}=req.body;
    console.log(title,body);
    console.log(req.user);
    mysqlConnection.query('insert into Post (title,body,postedBy) values(?,?,?)',[title,body,req.user.id],(err,rows,feilds)=>{
        if(!err){
            return res.json({message:"post successfull"});
        }
        else{
            return res.sendStatus(403);
        }
    })
})

router.get('/allpost',(req,res)=>{
    mysqlConnection.query('select * from post',(err,rows,feilds)=>{
        if(!err){
            console.log(rows);
           return res.send(rows);
            
        }
        else{
            return res.sendStatus(403).json({error:"cannot get posts"});
        }
    })
})

router.get('/mypost',requestLogin,(req,res)=>{
    mysqlConnection.query('select * from post where postedBy=?',[req.user.id],(err,rows,feilds)=>{
        if(err){
            console.log(JSON.stringify(err));
        }
        else{
            res.send(rows);
            console.log(rows);
        }
    })
})
module.exports=router; 