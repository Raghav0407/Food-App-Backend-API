const express = require('express');
const { protectRoute, isAuthorized } = require('../Controller/AuthController');
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan, top3plans} =require('../Controller/PlanController');
const planRoutes = express.Router();


planRoutes.route('/allPlans')
.get(getAllPlans)



//oen plan-> logged in necessary
planRoutes.use(protectRoute);
planRoutes.route('/plan/:id')
.get(getPlan)

//basic all plans
//only they can create update and delete plansa
planRoutes.use(isAuthorized(['admin','restaurantowner']))
planRoutes
.route('/crudplan')
.post(createPlan)


planRoutes
.route('/crudplan/:id')
.patch(updatePlan)
.delete(deletePlan)

//top3plans

planRoutes.route('/top3')
.get(top3plans);
