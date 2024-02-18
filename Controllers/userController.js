const users=require('../models/userModel')
const jwt=require('jsonwebtoken')


//register
exports.register=async(req,res)=>{
    console.log("Register API");
    const {username,email,password}=req.body
    console.log(username,email,password);
    try{
        const existingUser= await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("Account already exists...Please login!!!")
        }else{
            //add a user to collection
            const newUser=new users({
                username,email,password,profile:"",github:"",linkedin:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }


}

//login
exports.login=async(req,res)=>{
    console.log("Inside LOGIN API");
    const {email,password}=req.body
    console.log(email,password);
    try{
        const existingUser= await users.findOne({email,password})
        console.log(existingUser);
        if(existingUser){
            //existing user allow login
            const token =jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY)
            res.status(200).json({existingUser,token})
        }else{
          res.status(404).json("invalid email/password!!!")
        }
    }catch(err){
        res.status(401).json(err)
    }


}


//updateprofile
exports.editUser=async(req,res)=>{
    const userId=req.payload
    const {username,password,email,github,linkedin,profileImg}=req.body
    const profile=req.file?req.file.filename:profileImg
    try{
        const updateUser=await users.findByIdAndUpdate({_id:userId},{username,email,password,profile,github,linkedin},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch(err){
        res.status(401).json(err)
    }
}