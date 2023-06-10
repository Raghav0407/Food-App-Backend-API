const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());//global middleware function
app.listen(3000, () => {
    console.log("App is listening to post 3000");
})
app.use(cookieParser());
//mountin ging exprsss
const userRoutes = require('./Routers/UserRouter');
const reviewRoutes = require('./Routers/ReviewRouter');
const planRoutes = require('./Routers/PlanRouter');
const bookingRoutes = require('./Routers/BookingRouter');

app.use('/users', userRoutes);
app.use('/plans',planRoutes);
app.use('/review',reviewRoutes);
app.use('/booking',bookingRoutes)
