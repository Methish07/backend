const express=require('express');
const router=express.Router();
const {mysqlConnection}=require('../config');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config');
const requestLogin=require('../middleware/requestLogin');

router.get("/protected",requestLogin,(req,res)=>{
    res.send("hello user");
})

router.post('/signup',(req,res)=>{
    const {u_name,email,u_password}=req.body;
    if(!email||!u_password||!u_name){
        res.json({error:"please fill all the fields"})
        } 
    else{
        console.log(req.body );
        mysqlConnection.query('select * from User where u_name=?',[u_name],(err,rows,feilds)=>{
            if(err){
                console.log(rows);
                res.status(422).json({error:"user already exists"});
            }
            else{
                mysqlConnection.query('insert into User(u_name,email,u_password) values(?,?,?)',[u_name,email,u_password],(err,rows,feilds)=>{
                    if(err){
                        console.log(JSON.stringify(err,undefined,2));
                    }
                    else{
                        console.log(rows);
                        res.send("user registered");
                    }
                })
            }
        })
    }

})

router.post('/signin',(req,res)=>{
    const {email,u_password}=req.body;
    if(!email||!u_password){
        res.json({error:"please fill all the fields"})
        }
        else{
            mysqlConnection.query('select * from User where email=?',[email],(err,rows,feilds)=>{
                if(err){
                   return res.status(422).json({error:"invalid email or password"});
                }
                else{
                    if((rows[0].u_password)===u_password){
                        const token=jwt.sign({_id:rows[0].id},JWT_SECRET);
                        return res.json({token,rows});
                    }
                    else{
                        return res.status(422).json({error:"invalid email or password"});
                    }
                    
                }
            })
        } 

})


module.exports=router;