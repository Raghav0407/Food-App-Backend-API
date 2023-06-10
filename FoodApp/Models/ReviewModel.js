const mongoose = require('mongoose');

const db_link = 'mongodb+srv://raghavgarg4702:Raghav4702@clusterfoodapp.apy2l2y.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    //console.log(db);
    console.log("DB CONNECTED");
})
.catch(function(err){
    console.log(err);
})


//review model 

const reviewSchema = new mongoose.Schema({
    reveiw:{
        type:String,
        required:[true,'Reveiw is required']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,'Rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'Reveiw must belong to a plan']
    }
})



//monoggsee hooks 
//whenever we find something in model then this hiook should work

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"name profileImage"
    }).populate("plan");
    next();
})
//making model

const reviewModel = mongoose.model('reviewModel',reviewSchema);
module.exports = reviewModel;