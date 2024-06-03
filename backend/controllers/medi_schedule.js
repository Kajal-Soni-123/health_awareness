const {users,once_only,weekly_medi,daily_medi, notification} = require("../models");
let secret_key = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

const {Sequelize} = require('sequelize');
const addSchedule = async (req,res)=>{
console.log("sfwgwwwwwvawf");
let token = req.headers.cookie.split('=')[1];
let token_arr = jwt.verify(token, secret_key);
let user_id = token_arr.user_id;
let medi_name = req.body.name;
let medi_desc = req.body.desc;
let medi_time = req.body.time;
let schedule_type = req.body.type;
if(schedule_type==0){
    let medi_date = req.body.date;
    try{
    let result = await once_only.create({
        user_id:user_id,
        medi_name:medi_name,
        medi_desc:medi_desc,
        medi_time:medi_time,
        medi_date:medi_date
    })
    res.json(result)
    }catch(err){
        console.log(err)
        res.json(err)
    }
}
else if(schedule_type==1){
    try{
   let start_date = req.body.start_date;
   let end_date = req.body.end_date;
   let result = await daily_medi.create({
    user_id:user_id,
    start_date:start_date,
    end_date:end_date,
    medi_name:medi_name,
    medi_desc:medi_desc,
    medi_time:medi_time
   })
   res.json(result)
    }catch(err){
        console.log(err)
        res.json(err)
    }
}else{
    let day = req.body.day;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date
    try{
let result = await weekly_medi.create({
    week_day:day,
    start_date:start_date,
    end_date:end_date,
    medi_time:medi_time,
    medi_name:medi_name,
    medi_desc:medi_desc
})
res.json(result)
    }
catch(err){
    console.log(err);
    res.json(err)
}
}
}

const notiById = async (req,res)=>{
    let token = req.headers.cookie.split('=')[1];
    let token_arr = jwt.verify(token, secret_key);
    let user_id = token_arr.user_id;
    try{
       let result = await notification.findAll({
        where:{
            user_id:user_id,
            isTaken:false
        }
       });
       res.json(result);
    }catch(err){
        console.log(err);
    }
}

const taken_medi = async (req,res)=>{
    let token = req.headers.cookie.split('=')[1];
    let token_arr = jwt.verify(token, secret_key);
    let user_id = token_arr.user_id;
    let noti_id = req.query.id;
    try{
     let result = await notification.update({isTaken:true},{
        where:{
            user_id:user_id,
            id:noti_id
        }
     });
     res.json(result)
    }catch(err){

    }
}

const weeklyReport = async (req,res)=>{
    let result = [];
try{
let result1 = await notification.findAll({
    where:{
        
    }
})
}catch(err){
    console.log(err)
}
}
module.exports = {addSchedule,notiById, taken_medi, weeklyReport};