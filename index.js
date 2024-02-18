//loads .env file contents into process.env
require('dotenv').config()  
const express=require('express')
const cors=require('cors')
const router=require('./Routes/router')
require('./DB/connection')

//express server
const pfServer=express()

//use cors in server
pfServer.use(cors())

//use json parser-Application specific middleware
pfServer.use(express.json())

//use router
pfServer.use(router)

//available file/folder from server to other application
pfServer.use('/uploads',express.static('./uploads'))

const PORT=3000

//to host pfServer:localhost 3000
pfServer.listen(PORT,()=>{
    console.log(`project fair server started at port :${PORT}`);
})

//to resolve get http request to http://localhost:3000/
pfServer.get('/',(req,res)=>{
    res.send('<h1 style=color:red;>Project Fair Server started....and waiting for client request</h1>')
})
