const mongoose=require('mongoose')

const connectionString = process.env.connectionString

mongoose.connect(connectionString).then(()=>{
    console.log("mongoose atlas connected successfully with pfserver");
}).catch((reason)=>{
    console.log(reason);
    console.log("mongodb connection failed!!!");
})