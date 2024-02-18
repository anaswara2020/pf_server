const projects=require('../models/projectModel')

//add project
exports.addProject=async(req,res)=>{
    console.log("inside add project API");
    const userId=req.payload
    const {title,language,overview,github,website}=req.body
    const projectImg= req.file.filename
    console.log(title,language,overview,github,website,projectImg,userId);
    try{
        const exisitingProject =await projects.findOne({github})
        if(exisitingProject){
            res.status(406).json("project repository is already exist!!! Please upload another...")
        }
        else{
            //add project
            const newProject=new projects({
                title,language,overview,github,website,projectImg,userId
            })
            await newProject.save()
            res.status(200).json(newProject)

        }
    }
    catch(err){
        res.status(401).json(err)
    }
}


//get home project
exports.getHomeProject=async(req,res)=>{
    try{
        const homeProjects=await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

//get all project
exports.getAllProject=async(req,res)=>{
    const searchKey =req.query.search
    const query={
        language:{
            $regex:searchKey,$options:"i"
        }
    }
    try{
        const allProjects=await projects.find(query)
        res.status(200).json(allProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

//get user project
exports.getUserProject=async(req,res)=>{
    const userId=req.payload
    try{
        const userProjects=await projects.find({userId})
        res.status(200).json(userProjects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

//edit project
exports.editProject=async(req,res)=>{
    console.log("inside edit project");
    const {pid}= req.params
    const userId=req.payload
    const{title,language,overview,github,website,projectImg}=req.body
    const uploadImg=req.file?req.file.filename:projectImg
    try{
        const updateProject= await projects.findByIdAndUpdate({_id:pid},{
            title,language,overview,github,website,projectImg:uploadImg,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(err){
      res.status(200).json(err)
    }
}

//remove project
exports.removeProject=async(req,res)=>{
    console.log("inside remove project");
    const {pid}=req.params
    try{
        const projectDetails= await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)
    }
    catch(err){
        res.status(401).json(err)
    }
}