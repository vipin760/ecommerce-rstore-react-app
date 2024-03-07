const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middelware/catchAsyncErrors');
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const { router } = require('../app');
const crypto = require('crypto');

////////////////////////////////////////////////////////////////////////////////////
const generateToken = (user)=>{
    const token = jwt.sign({id:user._id},process.env.JWTSECRET,{expiresIn:process.env.JWT_EXPIRE})
    return token
   }
/////////Register user///////////////////////////////////////////////////////////////////////////
exports.registerUser = catchAsyncErrors( async(req,res,next)=>{
    const {name,email,password} = req.body
    const passwordHash = await bcrypt.hash(password,10);

     await User.create({
        name,email,password:passwordHash,avatar:{
            public_id:"81563256322",
            url:"image.jpeg"
        }
    }).then(data=>{
        console.log(data)
        const token = generateToken(data)
       return res.status(201).send({status:true, data:'',token, message:"user registration completed"});
    }).catch(err=>{
        console.log(err.message);
        return next(new ErrorHandler(err.message,400));
    }) 
});
////////////////login user//////////////////////////////////////////////////////////////////////////

exports.loginUser = catchAsyncErrors( async (req,res,next)=>{
    const {email, password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("Please enter Email & Password",400));
    }
    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid email or password",401))
    }
    const isPasswordTrue =await bcrypt.compare(password,user.password);
    if(!isPasswordTrue){
        return next(new ErrorHandler("invalid email or password",401));
    }
    const token = generateToken(user)
    if(token){
        sendToken(user,token,201,res)
    }
    
}) 

/////////////Logout user///////////////////////////////////////////////////////////////////////

exports.logoutUser = catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(201).send({status:true, message:"Loggout Success"})
})

////////////////forgot password//////////////////////////////////////////////////////////////////

exports.forgotPassword = catchAsyncErrors ( async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next (new ErrorHandler("email not found",404));
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

     const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/user/reset-password/${resetToken}`
     const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested please ignore`

     try {
        await sendEmail({
            email:user.email,
            subject:'R-store Recovery Email',
            message
        })
        res.status(201).send({status:true,data:'',message:`Email Send you are providing ${user.email} email address successfully`})
        
     } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));
     }

})
////////////////reset password//////////////////////////////////////////////////////////////////
exports.resetpassword = catchAsyncErrors ( async (req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })
    if(!user){
        return next(new ErrorHandler("invalid token or expired token",400));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler(`Password and confirmpassword doesn't match`,400));
    }
    const passwordHash= await bcrypt.hash(req.body.password,10)
    user.password = passwordHash
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save().then(user=>{
    const token = generateToken(user)
    sendToken(user,token,200,res)
    }).catch(err=>{
        return next(new ErrorHandler("oops..! something went wrong please try later",400));
    })
    
})

////////////////forgot password//////////////////////////////////////////////////////////////////