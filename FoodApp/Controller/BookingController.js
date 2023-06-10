// This is your test secret API key.
const stripe = require('stripe')('sk_test_51NG4n1SJsZ7sCjIhE8l1TnmA0IPu6V4T7mMA0U1TOQZZvcasUC2gpKqfnP7UyxL9HoZLJm3A3Ct0jtOVq7aqb7rx00hkHEDggK');
const planModel = require('../Models/PlanModel');
const userModel = require('../Models/userModel');

module.exports.createSession = async function createSession(req,res){
    try {
        let userId = req.id;
        let planId = req.params.id;

        const user = await userModel.findById(userId);
        const plan  = await planModel.findById(planId);

        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            customer_email:user.email,
            client_refernce_id:plan.id,
            line_items:[
                {
                    name:plan.name,
                    description:plan.description,
                    //deploy website
                    amount:plan.price*100,
                    currency:"inr",
                    quantity:1
                }
            ],
            success_url:`${req.protocol}://${req.get('host')}/profile`,
            cancel_url:`${req.protocol}://${req.get('host')}/profile`
        })
        res.json({
            status:"success",
            session
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}