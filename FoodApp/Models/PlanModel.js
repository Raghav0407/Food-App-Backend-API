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

//plan schema

const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[20,'Plan name should not exceed 20 charachters']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
    type:Number,
    required:[true,'Price Not entered']
    },
    ratingsAverage:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discont<100
        },'Discount should not exceed price']
    }
})



const planModel = mongoose.Model('planModel',planSchema);
// (async function createPlan(){
//     let planObj= {
//         name:"Superfood",
//         duration:20,
//         price:1000,
//         ratingsAverage:5,
//         discount:20
//     }
//     const doc = new planModel(planObj);
//     await doc.save();
// })();



module.exports = planModel;