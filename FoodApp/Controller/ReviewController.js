const reviewModel = require("../Models/ReviewModel");
const planModel  =require("../Models/PlanModel");



module.exports.getAllReviews = async function getAllReviews(req,res) {
    try{
      const reviews = await reviewModel.find();
      if(reviews){
        return res.json({
            message:"Reviows done",
            data:reviews
        })
      }
      else{
        return res.json({
            message:"Eroor in reviews "
        })
      }
    }
    catch(err){
     res.json({
        message:err.message
     })
    }
}

module.exports.top3reviews = async function top3(req,res){
    try {
         //now i have to sort them all based on ratings and get top 3 plans
        const reviews = await reviewModel.find().sort({
            ratings:-1
        }).limit(3);
        if(reviews){
            return res.json({
                message:"Top 3 reviews",
                data:reviews
               })
        }
        else{
            res.json({
                message:"NOt accessed"
            })
        } 
    } catch (error) {
        res.json({
            message:err.message
        })
    }
}

module.exports.getPlanReviews = async function getPlanReview(req,res){
    try {
        let planid = req.params.id;
        let reviews =await  reviewModel.find();
        reviews.filter(review => review.plan._id == planid)
        
            return res.json({
                message:"Review retrived",
                data:reviews
            })
    
        
    } catch (error) {
        res.json({
            message:err.message
        })
    } 
}

module.exports.createReview = async function createReview(req,res){
    try{
    let id = req.params.plan;
    let plan=await planModel.findById(id);
    let review = await reviewModel.create(req.body);
    //plan.ratingsAverage + req.body.
     await plan.save();
}
catch(err){
    res.json({
        message:err.message
    })
}
}

module.exports.updateReview = async function updateReview(req,res){
    try {
        let planid = req.params.id;
        //id from frontend
        let id = req.body.id;
        let datatobeupdated = req.body;
        console.log(id);
        console.log(datatobeupdated);
        let keys = [];
        for (let key in datatobeupdated){
            if(key == 'id') continue;
            keys.push(key);
        }
        let review = await reviewModel.findById(id);
        for(let key in keys){
            review[key] = datatobeupdated[key];
        }
        await review.save();
         res.json({
            message:"Review  updated successfully",
            data:review
         })
    } catch (error) {
        res.json({
            message:err.message,
        })
    }
}

module.exports.deleteReview = async function deleteReview(req,res){
    try{
    let planid = req.params.id;
    //id from frontend
    let id = req.body.id;
    let deleteReview= await reviewModel.findByIdAndDelete(id);
    return res.json({
        message:"review deleted",
        data:deleteReview
    })
}
catch(err){
    res.json({
        message:err.message
    })
}
}