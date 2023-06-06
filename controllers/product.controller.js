const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const isBodyComplete = require("../utils/isBodyComplete");
const Product = require("./../models/product.model");

exports.postProduct = catchAsync(async (req,res,next)=>{
    //Check if body is complete
    const isComplete = isBodyComplete(req,["name","description","price","category","seller"]);
    if(!isComplete[0]){
        return next(
            new AppError(`${isComplete[1]} missing from request body!`,400)
        );
    };

    const product = await Product.create({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        seller:req.body.seller
    });
    
    res.status(200).json({
        status:'success',
        message:'Product created succesfully',
        data:product
    })
});


exports.getProductById = catchAsync(async (req,res,next)=>{
    const product = await Product.findOne({_id:req.params.id});

    if(!product){
        return next(
            new AppError('Product Id invalid',400)
        )
    }

    return res.status(200).json({
        status:'success',
        message:'Product fetched succesfully!',
        data:product
    })
})

exports.getAllProduct = catchAsync(async (req,res,next)=>{
    const product = await Product.find();

    return res.status(200).json({
        status:'success',
        message:'All Product fetched succesfully!',
        data:product
    })
})

exports.updateProduct = catchAsync(async (req,res,next)=>{
    await Product.findByIdAndUpdate({_id:req.params.id},req.body);

    return res.status(200).json({
        status:'success',
        message:"Product updated succesfully!"
    })
})

exports.deleteProduct = catchAsync(async (req,res,next)=>{
    await Product.findByIdAndRemove({_id:req.params.id});

    return res.status(204).json({
        status:'success',
        message:"Product removed succesfully!"
    })
})