exports.globalErrorController = (error,req,res,next)=>{

    console.log("ERROR:",error);
    if(error.isOperational){
        return res.status(error.code).json({
            message:error.msg,
            status:'Fail'
        })
    }

    return res.status(500).json({
        message:'Internal Server Error',
        status:'Error'
    })
}