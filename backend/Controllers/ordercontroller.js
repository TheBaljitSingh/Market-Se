const Order = require("../models/orderModel")
const Product = require("../models/prodectModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//CReate new order

exports.newOrder = catchAsyncError(async (req, res, next) =>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    })
});

//get Single Order
exports.getSingleOrder = catchAsyncError(async(req, res, next)=>{


    const orders = await Order.findById(req.params.id).populate("user","name email");
    //populate use hota hai jaise user ki id milega to wo user to collection me ja ke name aur email ko le ke aayega

    if(!orders){
        return next(new ErrorHandler("Order not found with this Id " , 404));

    }

    res.status(200).json({
        success: true,
        orders,
    });

});

//get logged in user  Orders
exports.myOrders = catchAsyncError(async(req, res, next)=>{

    const orders = await Order.find({user: req.user._id});
    // console.log(req.user._id);

    if(!orders){
        return next(new ErrorHandler("Order not found with this Id.. " , 404));
    }

  

    res.status(200).json({
        success: true,
        orders,
    });

});

// get all orders - Admin
exports.getAllOrders = catchAsyncError(async (req, res, next)=>{
    const orders = await Order.find({});

    let totalAmount = 0;

    orders.forEach((order)=>{ // jitne bhi order hua hai uska total amount show karna ke liyea
        totalAmount+=order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });

});


//update order status -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id.. ", 404));

    }
   
    console.log(order.shippingInfo);

    if(order.orderStatus==="Delivered"){
        return next( new ErrorHandler("you have delivered this product", 400));
    }

    order.orderItems.forEach(async (o)=>{
        console.log(o.product, o.quantity);
        await updateStock(o.product, o.quantity);
    });

    order.orderStatus=req.body.status;

    if(req.body.status=="Delivered"){
        order.deliveredAt=Date.now();
    }

    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        
    });

});
async function updateStock(id, quantity){
//     console.log("id " +id);
    const prod = await Product.findById(id);

    prod.stock -= quantity;

    await prod.save({validateBeforeSave:false});
}




//delete order - admin

exports.deleteOrder = catchAsyncError(async(req, res, next)=>{
    console.log("enterd in delete method");
    const order = await Order.findById(req.params.id);
  
    if(!order){
        return next(new ErrorHandler("Order not found with this Id.. " , 404));
    }

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
   
   res.status(200).json({
    success: true,
    message:"Order deleted successfully",  
    deletedOrder 


});




    

});