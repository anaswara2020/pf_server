const jwt = require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("inside JWT middleware!!!");
    try{
        const token=req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token){
        const jwtResponse=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(jwtResponse);
        req.payload=jwtResponse.userId
    }else{
        res.status(406).json("please provide token!!")
    }
    next()}
    catch{
        res.status(401).json("access denied ...Please login!!!")
    }
}

module.exports=jwtMiddleware