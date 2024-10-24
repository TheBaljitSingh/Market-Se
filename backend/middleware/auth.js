const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    

    if(!token){
        return next( new ErrorHandler("Please Login to access this resource",401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById(decodedData.id);

    // next( new ErrorHandler("yaha error hai!", 400));
    next();
    // console.log(token);
});

// exports.isValidate = catchAsyncError(async(req, res, next)=>{
//     const {token} = req.cookies;
    

//     if (!token) return  next(new ErrorHandler("No token, authorization  denied"), 401);
    
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//       } catch (err) {
//         return res.status(401).json({ message: 'Token is not valid or has expired' });
//       }
     
// })

exports.authorizeRoles = (...roles)=>{

    return (req,res,next)=>{
        console.log(req.user.role);
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource `,403)
            );
        }

        next();

    };

}