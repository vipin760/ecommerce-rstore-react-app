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
        const token = generateToken(data)
       return res.status(201).send({status:true, data:token, message:"user registration completed"});
    }).catch(err=>{
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
        res.status(201).send({status:true,data:'',message:`Email Send you are providing ${user.email} email address successfully`,message})
        
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

    await user.save().then(user=>{
    const token = generateToken(user)
    sendToken(user,token,200,res)
    }).catch(err=>{
        return next(new ErrorHandler("oops..! something went wrong please try later",400));
    })
    
})

////////////////get user detailes//////////////////////////////////////////////////////////////////

exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).send({status:true,data:user,message:"user data fetch successfully"});
})

///////////////////update user/////////////////////////////////////////////////////////////////////////////////
exports.updatePassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordTrue =await bcrypt.compare(req.body.oldPassword,user.password);
    if(!isPasswordTrue){
        return next(new ErrorHandler("old password is incorrect",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler(`newpassword and confirmpassword doesn't match`,400));
    }
    const passwordHash = await bcrypt.hash(req.body.newPassword,10);
    user.password = passwordHash

    await user.save().then((data)=>{
        const token = generateToken(data);
        sendToken(data,token,200,res);
    })

})
////////////////////////////////////////////////////////////////////////////////////////////////////

exports.updateProfile = catchAsyncErrors ( async (req,res,next)=>{
    const newUser ={
        name:req.body.name
    }
    const user = await User.findByIdAndUpdate(req.user.id,newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).send({status:true,user, data:'',message:"profile updated successfully"})
})

//////////////////////get all users//////////////////////////////////////////////////////////////////////////////

exports.getAllUser = catchAsyncErrors ( async (req,res,next)=>{
    const users = await User.find()
    res.status(200).send({status:true, data:users,message:"all users are listed"});
})

//////////////////////get single users//////////////////////////////////////////////////////////////////////////////

exports.getSingleUser = catchAsyncErrors ( async (req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler("user data not found",400))
    }
    res.status(200).send({status:true, data:user,message:"all users are listed"});
})

//////////////////////delete sigle user//////////////////////////////////////////////////////////////////////////////

exports.deleteUser = catchAsyncErrors (async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler("user not found our collection",400))
    }
    // const userDelete = await User.deleteOne({_id:req.params.id})
    // if(userDelete.deletedCoun===1){
    //     res.status(201).send({status:true,data:'',message:"deleted successfully"})
    // }
    await User.deleteOne({_id:req.params.id}).then((data)=>{
        if(data.deletedCount===1){
            res.status(200).send({status:true,data:'',message:"deleted user"});
        }
    })
    
})

