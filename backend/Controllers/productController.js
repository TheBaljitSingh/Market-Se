const Product = require("../models/prodectModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

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
  
