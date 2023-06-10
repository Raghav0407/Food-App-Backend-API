const express = require('express');
const userRoutes = express.Router();
const {getUser,updateUser,deleteUser,getAllUsers,updateProfileImage} =require('../Controller/UserController')
const {signup,login,isAuthorised,protectRoute,forgetpassword,resetpassword,logout} =require('../Controller/AuthController');
const multer = require('multer');
//user options to update or deleet
userRoutes.route('/:id')
.patch(updateUser)
.delete(deleteUser)

//we are making the login and signup in usersroute rather than in auth route
userRoutes.route('/signup')
.post(signup);

userRoutes.route('/login')
.post(login);


//forget padssword

userRoutes.route('/forgetpassword')
.post(forgetpassword);

userRoutes.route('resetpassword/:token')
.post(resetpassword);


//muletr for file uplaod

const multerStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'/public/images')
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date,now()}.jpeg`)
    }
})
//now filtering the file
const filter = function(req,file,cb){
    if(file.minetype.startsWith("image")){
        cb(null,true);
    }
    else{
        cb(new Error("Not an image! Please uplaod an image"),false);

    }
}

const uplaod = multer({
    storage:multerStorage,
    fileFilter:filter
})
//noe making ploads

userRoutes.post("/ProfileImage",uplaod.single,updateProfileImage);
userRoutes.get("/ProfileImage",(req,res)=>{
    res.sendFile("FoodApp/Multer.html")
})
userRoutes.route('/logout')
.get(logout)
//to protect login of user profile page
userRoutes.use(protectRoute);
userRoutes.route('/userProfile')
.get(getUser)




//get all users for admin specific
userRoutes.use(isAuthorised(['admin']));
userRoutes.route('/')
.get(getAllUsers)


module.exports = userRoutes;