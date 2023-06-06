const express = require("express");
const { globalErrorController } = require("./controllers/error.controller");
const AppError = require("./utils/AppError");
const userRouter = require("./routes/user.routes.js");
const categoryRouter = require("./routes/category.routes.js");
const productRouter = require("./routes/product.routes.js");


const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter);
app.use("/api/category",categoryRouter);
app.use("/api/product",productRouter);




app.all('*',(req,res,next)=>{
    return next(
        new AppError('Route doesn\'t exist',404)
    )
});
app.use(globalErrorController);

module.exports = app;