const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middelware/catchAsyncErrors');
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


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
        return next(new ErrorHandler("something went wrong please try agait after sometimes",400));
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
        return next (ErrorHandler("invalid email or password",401))
    }
    const isPasswordTrue =await bcrypt.compare(password,user.password);
    if(!isPasswordTrue){
        return next(new ErrorHandler("invalid email or password",401));
    }
    const token = generateToken(user)
    if(token){
        return res.status(201).send({status:true, data:'',token, message:"user login completed"});
    }
    
}) 

////////////////////////////////////////////////////////////////////////////////////