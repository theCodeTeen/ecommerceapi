const { promisify } = require("util");
const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync.js");
const isBodyComplete = require("../utils/isBodyComplete.js");
const User = require("./../models/user.model.js");

const jwt = require("jsonwebtoken");

const sendJWT = (user,res) =>{
    // console.log(process.env.JWT_EXPIRY);
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY * 60 * 60 * 24
    });

    res.cookie('jwt',token,{
        httpOnly:true,
        expires:new Date(Date.now() +process.env.JWT_EXPIRY * 60 * 60 * 24 * 1000)
    });

    user.password=undefined;

    return res.status(200).json({
        status:'success',
        message:'Login succesfull',
        data:user
    });
}

exports.register = catchAsync(async (req,res,next)=>{

    //Check if body is complete
    const isComplete = isBodyComplete(req,["firstName","lastName","email","password","passwordConfirm","role"]);
    if(!isComplete[0]){
        return next(
            new AppError(`${isComplete[1]} missing from request body!`,400)
        );
    }

    if(req.body.role =="admin") req.body.role = "user";
    
    //Check if password matches password confirm
    if(req.body.password!==req.body.passwordConfirm){
        return next(
            new AppError(`Password should match PasswordConfirm!`,400)
        );
    }

    //Create a new user
    const newUser = await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    });

    newUser.password = undefined;

    return res.status(201).json({
        status:'success',
        message:'User created succesfully',
        data:newUser
    })

});

exports.login = catchAsync(async (req,res,next)=>{
    //Check if body is complete
    const isComplete = isBodyComplete(req,["email","password"]);
    if(!isComplete[0]){
        return next(
            new AppError(`${isComplete[1]} missing from request body!`,400)
        );
    }

    //Check if user exists with given email
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(
            new AppError('Email Id or Password Incorrect!',400)
        );
    }

    //Check if password matches with user
    if(!await user.correctPassword(req.body.password,user.password)){
        return next(
            new AppError('Email Id or Password Incorrect!',400)
        );
    }

    //Create and send JWT
    sendJWT(user,res);
});

exports.isLoggedIn = catchAsync(async (req,res,next)=>{
    console.log(req.cookies);
    const token = req.cookies.jwt;
    if(!token){
        return next(
            new AppError('Please login!',401)
        );
    }

    const data = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    
    const user = await User.findById({_id:data._id});
    if(!user){
        return next(
            new AppError('JWT invalid!',401)
        );
    }

    user.password = undefined;
    req.user = user;

    next();
});

exports.isAuthorized = (role)=>{
    return catchAsync(async (req,res,next)=>{
        if(req.user.role!==role){
            return next(
                new AppError('Your not authorized for action',401)
            );
        }

        next();
    });
}

exports.getUserProfile = catchAsync((req,res,next)=>{
    return res.status(200).json({
        status:"success",
        message:"User profile fetched succesfully!",
        data:req.user
    })
})