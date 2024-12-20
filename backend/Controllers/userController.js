const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
//Register a User

exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const {name, email, password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profileUrl"
        }
    });

    sendToken(user,201,res);

});

exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");
    //how it access password ? which is encrypted
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    } 

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);
});

//Logout User

exports.logoutUser = catchAsyncError(async(req,res,next)=>{
    
    // console.log(res);
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out",
    });  
})

//Forgot password
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    //Get resetPassword token

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,

        });

        res.status(200).json({
            success: true,
            message:`Email send to ${user.email} successfully`,
        })

    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});

        return next( new ErrorHandler(error.message, 500));

    }
});

//Reset Password
exports.resetPassword = catchAsyncError(async (req,res,next)=>{
   
    //creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hax");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }
    if(req.body.password!=req.body.confirmPassword){
        return next(new ErrorHandler("Password does not matched", 400));

    }
    user.password = req.body.password;
    user.resetPasswordToken =undefined;
    user.resetPasswordExpire= undefined;

    await user.save();

    sendToken(user,200,res);

});

//get User Detail - login wale users ke details ke liyea
exports.getUserDetails = catchAsyncError(async (req,res,next)=>{
    console.log(`hello ${req.user.name}, how are you`);

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    });
    
});

//update the password
exports.updatePassword = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("old password in incorrect",400));
    }
    if(req.body.newPassword !== req.body.newPassword){
        return next(new ErrorHandler("password ddoes not match",400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);

})
//update the user profile for itself user
exports.updateProfile = catchAsyncError(async (req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,

    }
    // we will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false

    })

    res.status(200).json({
        success: true,
    });
})

//Get all users for - Admin
exports.getAllUsers = catchAsyncError(async(req, res, next) => {
    const users = await User.find();

    if(!users){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        users,
    })

})


//Get single users for - Admin
exports.getSingleUser = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        user,
    })

});

//update the User Role - Admin
exports.updateUserRole = catchAsyncError(async (req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role: req.body.role,

    }

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false

    })
    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.param.id}`, 400))
    }

    res.status(200).json({
        success: true,
    });
})

//Delete user - Admin
exports.deleteUser = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.params.id);
    // we will remove cloudinary later

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400))
    }

    await user.deleteOne();
  

    res.status(200).json({
        success: true,
        message:"User Deleted successfully",
    });
})

