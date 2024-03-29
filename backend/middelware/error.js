const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req, res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "internal server down"

    // wrong mongodb id error
    
    if(err.name==="CastError"){
        const message = `resource not found . invalid: ${err.path}`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statuscode).send({status:false,data:'',message:err.message});
}

