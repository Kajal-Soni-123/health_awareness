
const {Sequelize} = require("sequelize");
const {users} = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let secret_key = process.env.SECRET_KEY;
const registerUser = async (req,res)=>{
let name = req.body.name;
let email = req.body.email;
try{
let result = await users.create({
    name:name,
    email:email
});
res.json(result);
}
catch(err){
    console.log(err)
}
}

const createPassword = async (req,res)=>{
    let id = req.body.id;
    let pass = req.body.pass;
    let salt = await bcrypt.genSalt(10);
    let dbPass = await bcrypt.hash(pass,salt);
    console.log(pass);
try{
   let result = await users.update({
     password:dbPass,
     salt:salt
   },{
    where:{
    id:id
    }
   });
   res.json(result);
}catch(err){
console.log(err);
res.json(err);
}
}

const loginUser = async (req,res)=>{
    let email = req.body.email;
    let pass = req.body.pass;
    try{
let result = await users.findAll({where:{
    email:email
}});
console.log(result)
 if(result.length==1){
    let dbsalt = result[0].salt;
    let dbpass = result[0].pass;
    let password = await bcrypt.hash(pass,dbsalt);
    let payload = {email:result[0].email,
        user_id:result[0].id
    };
    let token = jwt.sign(payload,secret_key);
    res.cookie('token',token, { maxAge:1000*60*60, httpOnly: true }),
    res.json("user login successfully");
 }
    }catch(err){
        console.log(err)
        res.json("invalid credentials");
    }
}

const logout = async (req,res)=>{
   res.clearCookie();
   res.json("you have logout successfully");
}
module.exports = {registerUser, createPassword, loginUser, logout}