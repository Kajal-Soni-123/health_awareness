const express = require("express");
const { registerUser, createPassword, loginUser, logout} = require("../controllers/controller");
const {addSchedule,notiById, taken_medi, weeklyReport } = require('../controllers/medi_schedule');
const route = express.Router();
//require('../middlewares/passport') ;
route.post('/register',registerUser);
route.post('/createPass',createPassword);
route.post('/login',loginUser);
route.post('/addSchedule', addSchedule);
route.get('/getNotiById', notiById);
route.get('/takenMedi', taken_medi);
route.post('/showReport',weeklyReport);
route.get('/logout', logout);
route.post('/weeklyReport', weeklyReport);
module.exports = route;