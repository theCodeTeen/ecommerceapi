const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const isBodyComplete = require("../utils/isBodyComplete");
const Category = require("./../models/category.model");

exports.postCategory = catchAsync(async (req,res,next)=>{
    //Check if body is complete
    const isComplete = isBodyComplete(req,["name","description"]);
    if(!isComplete[0]){
        return next(
            new AppError(`${isComplete[1]} missing from request body!`,400)
        );
    };

    const category = await Category.create({
        name:req.body.name,
        description:req.body.description
    });
    
    res.status(200).json({
        status:'success',
        message:'Category created succesfully',
        data:category
    })
});

exports.getCategoryById = catchAsync(async (req,res,next)=>{
    const category = await Category.findOne({_id:req.params.id});

    if(!category){
        return next(
            new AppError('Category Id invalid',400)
        )
    }

    return res.status(200).json({
        status:'success',
        message:'Category fetched succesfully!',
        data:category
    })
})

exports.getAllCategory = catchAsync(async (req,res,next)=>{
    const category = await Category.find();

    return res.status(200).json({
        status:'success',
        message:'All Category fetched succesfully!',
        data:category
    })
})

exports.updateCategory = catchAsync(async (req,res,next)=>{
    await Category.findByIdAndUpdate({_id:req.params.id},req.body);

    return res.status(200).json({
        status:'success',
        message:"Category updated succesfully!"
    })
})

exports.deleteCategory = catchAsync(async (req,res,next)=>{
    await Category.findByIdAndRemove({_id:req.params.id});

    return res.status(204).json({
        status:'success',
        message:"Category removed succesfully!"
    })
})