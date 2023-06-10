const express = require('express');
const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken');
const {sendMail} =require("../Utility/Nodemailer");

//const {JWT_KEY} = require('Secrets.js');
//signup user
module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        sendMail("signup",user);
        if(user)
        {
            res.json({
                message: "User Signed Up",
                data: user
            }
            )
        }
        else{
            res.json({
                message:"User Not signed up"
            })
        }
        
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

//login user

module.exports.login = async function loginUser(req,res){
    try{
    let {email,password} = req.body;
    if(email){
    let user = await userModel.findOne({email:email});
    if(user){
        //bcrypt the req passwrod and then compare
       if(user.password==password){
        //implementing jsonwebtoken works

        let uid = user('_id');
        let token = jwt.sign({payload:uid},JWT_KEY) //making signature
        res.cookie('login',token,{httpOnly:true})
        console.log(token)
        return res.json({
            message:"User has logged in",
            userDetails:req.body
        })

       }
       else{
        return res.json({
            message:"User Not Found",

        })
       }
    }
    else{
        return res.json({
            message:"User Not Found",

        })
    }
}
}
catch(err){
  return res.json({
    message:err.msg
  })
}


}

//isAuthorized fucntion

//to check the users role
module.exports.isAuthorized = function isAuthorized(roles){
    return function(req,res,next){
        if(roles.includes(req.role)==true)
        {
            next();
        }
        else{
            res.status(401).json({
                message:"Operation Not allowed"
            })
        }
    }
}

//protect route
module.exports.protectRoute = async function protectRoute(req,res,next){
    try{
    let token;
    if(req.cookies.login){
        console.log(req.cookies);
        token = req.cookies.login;
        let payload = jwt.verify(token,JWT_KEY); 
        if(payload){
            console.log('paylaod',payload);
        const user = await userModel.findById(payload.payload)
        req.role = user.role;
        req.id = user.id;
        console.log(req.role,req.id);
        next();
        return res.json({
            message:"User  Verified"
        })
        }
        else{
            //for browser 
               const client = req.get('User-Agent');
               if(client.includes("Mozilla")==true)
               {
                return res.redirect('/login');
               }
            //for postman
              return res.json({
                message:"User Not Verified"
            })
    }
     
    }
   
    else{
        return res.json({
            message:"User has not logged in"
        })
    }
}
catch(err)
{
    res.json({
        message:err.message
    })
}
 }


module.exports.forgetpassword = async function forgetpassword(req,res){
    let {email} = req.body;
    try{
        if(user){
        const user=await userModel.find({email:email})
        //we have to send the mail and for sending mail wwe have to generate 
        //token and then make our link and send theat liunk
        const resetToken = user.createResetToken();
        //making our link 
        let resetpasswordlink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
        //now mail to user using nodemailer
        let obj={
            resetPasswordLink:resetpasswordlink,
            email:email
        }
        sendMail('resetpassword',obj);
        return res.json({
            message:"Mailm has been sent to reset passqword"
        })
    }
    else{
        return res.json({
            message:"Please Signup"
        })
    }
}
catch(err){
    res.status(500).json({
        message:err.message
    })
}
 }


 ///RESET PASSAORR
 //YOU HAVE LINK AND YOU HAVE TO RESET THE PASSWORD
module.exports.resetpassword = async function resetpassword(req,res){
    try{
    const token = req.params.token;
    
    let {password,confirmPassword} = req.body;
    const user = await userModel.findOne(
        {resetToken:token}
    )
    if(user){
        user.resetPasswordHandler(password,confirmPassword);
        await user.save();
        res.json({
            message:"Pssword changed successfully"
        })
    }
    else{
        res.json({
            message:"User Not found"
        })
    }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
     
 }


module.exports.logout = function logout(req,res){
    //empty your cookie and make age after 1,ms
    res.cookie('login',' ',{maxAge:1});
    res.json({
        message:"User Logout Successfully"
    })
 }