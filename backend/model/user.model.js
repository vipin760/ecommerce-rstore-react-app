const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');

const userSchema =new mongoose.Schema({
    name:{ 
        type:String, 
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 charactors"],
        minLength:[4,"please enter atleast 4 charactors"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Eamil"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should be greaterthan 8 charrectors"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

// reset password
userSchema.methods.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken
}



module.exports = mongoose.model("user",userSchema);

