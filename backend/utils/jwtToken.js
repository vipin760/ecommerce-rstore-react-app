
const sendToken = (user,token,statuscode,res)=>{
    const options = {
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 
        ),
        httpOnly:true
    }
    res.status(statuscode).cookie('token',token,options).send({status:true,data:token,message:"Success"})
}

module.exports = sendToken;