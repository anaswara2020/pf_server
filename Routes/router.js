const express =require ('express')
const router = new express.Router()
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

//register api
router.post('/register',userController.register)

//login api
router.post('/login',userController.login)

//add project api-router specific middleware
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImg'),projectController.addProject)

//getHome api
router.get('/get-home-project',projectController.getHomeProject)

//getAll api
router.get('/get-all-project',jwtMiddleware,projectController.getAllProject)

//getHome api
router.get('/get-user-project',jwtMiddleware,projectController.getUserProject)

//updateproject
router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single("projectImg"),projectController.editProject)

//removeproject
router.delete('/remove_project/:pid',jwtMiddleware,projectController.removeProject)

//updateuser
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImg"),userController.editUser)

//export router
module.exports=router