const express = require('express');
const bookingRoutes = express.Router();
const {protectRoute} = require('../Controller/AuthController')
const {createSession} =require('../Controller/BookingController');


bookingRoutes.post('/createSession',protectRoute,createSession);
bookingRoutes.get('/createSession',function(req,res){
   res.sendFile('')
})
module.exports = bookingRoutes;