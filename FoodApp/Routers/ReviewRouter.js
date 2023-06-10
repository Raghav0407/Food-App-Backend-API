const express = require('express');
const reviewRoutes = express.Router();
const { protectRoute, isAuthorized } = require('../Controller/AuthController');
const {getAllReviews,top3reviews,getPlanReviews,createReview,updateReview,deleteReview} =require('../Controller/ReviewController')

reviewRoutes.route('/all')
.get(getAllReviews);

reviewRoutes.route('/top3')
.get(top3reviews);

reviewRoutes.use(protectRoute)
reviewRoutes.route('/:id')
.get(getPlanReviews);

//only admin
reviewRoutes.use(isAuthorized(['admin','restaurantowner']))
reviewRoutes.route('/crud/:plan')
.post(createReview)
.patch(updateReview)
.delete(deleteReview)


module.exports = reviewRoutes;