const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./db/conn");


//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);

});



//config
dotenv.config({path:"../backend/config/config.env"});
//DB
connectDatabase();

const server = app.listen(process.env.PORT, (err)=>{
    if(err) console.log("error hai => "+ err)
    console.log(`Server is working on http://localhost:${process.env.PORT}`)

})

  
process.on("unhandledRejection",(err)=>{
    console.log(`Err: ${err.message}`);
    console.log(`Shutting down the serverdue to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })

})