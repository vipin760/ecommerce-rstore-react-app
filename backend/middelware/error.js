const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req, res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "internal server down"

    // wrong mongodb id error
    
    if(err.name==="CastError"){
        const message = `resource not found . invalid: ${err.path}`
        err = new ErrorHandler(message,400)
    }

    // mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400)
    }

    // jwt wrong
    if(err.name=== "jsonWebTokenError"){
        const message = 'Json web token is invalid, please try again'
        err = new ErrorHandler(message,400)
    }

    // jwt expire
    if(err.name === "TokenExpiredError"){
        const message = 'Json web token is expired, please try again'
        err = new ErrorHandler(message,400)
    }
    console.log(err)
    res.status(err.statuscode).send({status:false,data:'',message:err.message});
}

