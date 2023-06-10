const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const db_link = 'mongodb+srv://raghavgarg4702:Raghav4702@clusterfoodapp.apy2l2y.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    //console.log(db);
    console.log("DB CONNECTED");
})
.catch(function(err){
    console.log(err);
})

//user schema

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
           return this.confirmPassword===this.password
        }
    },
    role:{
        type:String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String

})
//pre post hooks in mongoose
// userSchema.pre('save',function(){
//     console.log("Before saving in db",this) //only id is added
// })
// userSchema.post('save',function(doc){
//     console.log("After saving in db",doc) //now v:0 is added if you have seeen
// })


userSchema.pre('save', function(){
    this.confirmPassword=undefined;
})
// userSchema.pre('save',async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password,salt);
//     console.log(hashedString);
// })
//model
//now how we can upadte our model accordibng to the data 

userSchema.methods.createResetToken=function(){
    //crypto package for  creating unique token
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken=resetToken;
    return resetToken;
}
userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}
const userModel = mongoose.model('userModel',userSchema);


module.exports = userModel;