const {users,daily_medi, once_only, weekly_medi, notification} = require('../models');
const {Sequelization, Op} = require('sequelize');
const sendNotification = async ()=>{
    let date = new Date();
    console.log(date);
    let today_day =date.getDay();
    let hr = 0;
    if(date.getHours()<10){
        hr = '0'+date.getHours();
    }
    else{
        hr = date.getHours();
    }
    let min = 0;
    if(date.getMinutes()<10){
         min ='0'+date.getMinutes();
    }else{
        min = date.getMinutes();
    }
    let current_time = hr+':'+min+':00';
    let d=0 ;
    if(date.getDate()<10){
        d = '0'+date.getDate();
    }
    else{
        d = date.getDate();
    }

    let m = 0;
    if(date.getMonth()+1<10){
         m ='0'+(date.getMonth()+1);
    }
    else{
         m = date.getMonth()+1;
    }
    console.log("month "+ m);
    let y = date.getFullYear();
    let current_date = y+'-'+m+'-'+d;
    try{
    let  result1 = await once_only.findAll({
         where:{
             medi_date:current_date,
             medi_time:current_time
         },
        raw:true
    });
    console.log(result1)
    if(result1.length!==0){
        result1.forEach(async element => {
        try{
         let data = await notification.create({
            user_id:element.user_id,
            medi_id:element.id,
            medi_type:0,
            message:`dear user you take medicine ${element.medi_name} at ${element.medi_time}`
         })
         console.log(data)
        }catch(err){
            console.log(err)
        }
        });
    }
   
    }catch(err){
        console.log(err);
    }
    try{
        let  result2 = await daily_medi.findAll({
             where:{
                 start_date:{
                    [Op.gte]:current_date,
                 },
                 end_date:{
                    [Op.lte]:current_date,
                 },
                 medi_time:current_time
             },
            raw:true
        });
        console.log(result2)
        if(result2.length!=0){
            result2.forEach(async element => {
            try{
             let data = await notification.create({
                user_id:element.user_id,
                medi_id:element.id,
                medi_type:1,
                message:`dear user you take medicine ${element.medi_name} at ${element.medi_time}`
             })
             console.log(data)

            }catch(err){
                console.log(err)
            }
            });
        }
        }catch(err){
            console.log(err);
        }
        
        try{
            let  result3 = await weekly_medi.findAll({
                 where:{
                     start_date:{
                        [Op.lte]:current_date,
                     },
                     end_date:{
                        [Op.gte]:current_date,
                     },
                     week_day:today_day,
                     medi_time:current_time
                 },
                raw:true
            });
            console.log(result3)
            if(result3.length!=0){
                result3.forEach(async element => {
                try{
                 let data = await notification.create({
                    user_id:element.user_id,
                    medi_id:element.id,
                    medi_type:1,
                    message:`dear user you take medicine ${element.medi_name} at ${element.medi_time}`
                 })
                 console.log(data)
                }catch(err){
                    console.log(err)
                }
                });
            }
            }catch(err){
                console.log(err);
            }
            
}


module.exports = {sendNotification};