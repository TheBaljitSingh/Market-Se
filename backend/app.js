const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();

// Enable CORS


// Enable CORS
const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true || doubt this is used for cookies??
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.options('*', cors()); // Handle preflight requests

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const product = require("./Routes/productRoute");
const user = require("./Routes/userRoute");
const order = require("./Routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);



// Middleware for Error Handling
app.use(errorMiddleware);


// adding for show message on get Request
app.get("/", (req, res)=>{
    res.send("Server is working fine!");
})

module.exports = app;
