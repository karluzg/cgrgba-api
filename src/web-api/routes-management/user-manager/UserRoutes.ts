import * as express from "express";
import  {UserController}  from "../../controller/user-manager/UserController";
const userRoutes=express.Router()

const userController=new UserController()
userRoutes.post("", userController.registerUser)

export default userRoutes


