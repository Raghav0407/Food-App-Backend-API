
const planModel = require('../Models/PlanModel');
module.exports.getAllPlans = async function getAllPlans(req,res){
    try{
    let plans =await  planModel.find();
    if(plans){
        return res.json({
            message:"All plans retrived",
            data:plans
        })
    }
    else{
        return res.json({
            message:"PLans not found"
        })
    }
}
catch(err){
     res.status(500).json({
        message:err.message
     })
}
}

module.exports.getPlan = async function getPlan(req,res){
    try{
        let id = req.params.id;
        let plan =await  planModel.findById(id);
        if(plan){
            return res.json({
                message:"Plan retrived",
                data:plan
            })
        }
        else{
            return res.json({
                message:"Plan not found"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}


module.exports.createPlan = async function createPlan(req,res){
    try{
    let planData = req.body;
    let createPlan = await planModel.create(planData);
    return res.json({
        message:"Plan created",
        data:createPlan
    })
}
catch(err){
    res.json({
        message:err.message
    })
}
}


module.exports.deletePlan = async function deletePlan(req,res){
    try{
    let id = req.params.id;
    let deletePlan = await planModel.findByIdAndDelete(id);
    return res.json({
        message:"Plan deleted",
        data:deletePlan
    })
}
catch(err){
    res.json({
        message:err.message
    })
}
}

module.exports.updatePlan = async function updatePlan(req,res){
    try {
        let id = req.params.id;
        let datatobeupdated = req.body;
        console.log(id);
        console.log(datatobeupdated);
        let keys = [];
        for (let key in datatobeupdated){
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        for(let key in keys){
            plan[key] = datatobeupdated[key];
        }
        await plan.save();
         res.json({
            message:"Plan updated successfully"
         })
    } catch (error) {
        res.json({
            message:err.message,
            data:plan
        })
    }
}

//get top 3 plans

module.exports.top3plans = async function top3plans(req,res){
    try {
         //now i have to sort them all based on ratings and get top 3 plans
        const plans = await planModel.find().sort({
            ratingsAverage:-1
        }).limit(3);
       return res.json({
        message:"Top 3 plans",
        data:plans
       })
        
    } catch (error) {
        res.json({
            message:err.message
        })
    }
}