const Product = require("../models/prodectModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const { findById } = require("../models/userModel");

//create Product --Admin
exports.createProduct = catchAsyncError(async (req,res,next)=>{

    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    
    res.status(201).json({
        success:true,
        product
    })
})


// Get All Product
exports.getAllProducts = catchAsyncError(async(req,res)=>{

    const resultPerPage = 3;
    const productCount = await Product.countDocuments();

    // req.query.keyword to samosa aayaga | req.body ke jaisa hai
    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    if(!products){
        return next(new ErrorHandler("Product not Found", 404))
    }

    res.status(200).json({    
        success:true,
        products,
        productCount});

})

//Update Product - Admin

exports.updateProduct = (async(req,res,next)=>{


    console.log(req.params.id);

        let product = await Product.findById(req.params.id);
        if(!product){
            return res.status(500).json({
                success:false,
                message:"Product not found"
            })
        }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body,
            {
            new:true,
            runValidators:true,
            useFindAndModify:false
        }
        );
        res.status(200).json({
            success:true,
            product
        })

    })

//Get Product Details Single

exports.getProductDetails = catchAsyncError(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found", 404))
    }
    res.status(200).json({
        success:true,
        product
    })


})
   
// Delete Product

exports.deleteProduct = catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not Found", 404))

    }

    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product Deleted :("
    })
})
  
// create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req,res, next)=>{

    const {rating, comment, productId} = req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating: Number(rating),
        comment,
    }; 

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev)=> rev.user.toString()===req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev =>{
          if(rev.user.toString() === req.user._id.toString()){
            rev.rating = rating,
            rev.comment = comment
          }
        });
        
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    let count = 0;
    product.reviews.forEach((rev) =>{
        avg+=rev.rating
    });

    product.ratings = (avg/product.reviews.length).toFixed(2);

    await product.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true,
        message:"sab sahi hai"
    });
});

// Get All Reviews of a product

exports.getProductReviews = catchAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({  
        success: true,
        reviews: product.reviews,
    })

});

//Delete Reviews
exports.deleteReviews = catchAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) =>{
        avg+=rev.rating
    });

    const ratings = (avg/reviews.length).toFixed(2);

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new: true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success: true,
        message:`Review by User Deleted successfully`,
    });


})

