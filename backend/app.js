const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error")
const app = express();
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));


//Route Imports
const product = require("./Routes/productRoute");
const user = require("./Routes/userRoute");
 
app.use("/api/v1", product);
app.use("/api/v1", user)

//Middleware for Error Handling
app.use(errorMiddleware)




module.exports = app;


/* 
const product = new Product({
    name:"Sonata watch",
    description:"matel finish golden analog watch",
    price:1499
})
product.save();

app.use("/api/v1/product/new",  (req,res)=>{
    // const product =   Product(req.body);
    console.log(req.body);
    res.send();

    res.status(200).json({
        success:true,
        product
    });
})
*/


