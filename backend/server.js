const express = require("express");
const app = express();
require('dotenv').config();
app.use(express.urlencoded({extended:true}));
const port = process.env.PORT;
const route = require('./routes/route');
const passport = require('passport');
const {sendNotification} = require('./middlewares/sendNoti');
setInterval(() => {
    sendNotification(); 
}, 1000*60);
console.log("fggdhgfhngfnhgf");
console.log(port);
app.use('/',route);
app.listen(port);