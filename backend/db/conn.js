const mongoose = require("mongoose");

const connectDatabase = ()=>{

    mongoose.connect(process.env.DB_URI, {useNewUrlParser:true})
        .then((data)=>{
            console.log(`DB Connection successfull: ${data.connection.host}`);
        })

}

module.exports = connectDatabase