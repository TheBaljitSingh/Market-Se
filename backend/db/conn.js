const mongoose = require("mongoose");

// const connectDatabase = ()=>{

//     mongoose.connect(process.env.DB_URI, {useNewUrlParser:true})
//         .then((data)=>{
//             console.log(`DB Connection successfull: ${data.connection.host}`);
//         })

// }
const connectDatabase = async ()=>{
    await mongoose.connect(process.env.DB_URI)
    .then((data)=>{
        console.log(`Database Connection successfull`)
    })
    .catch((e)=>{
        console.log(`Database Connectiion Error: ${e}`)
    })
}

module.exports = connectDatabase