import * as express from "express";
import { container } from 'tsyringe';
import  {UserController}  from "../../controller/UserController";
import logger from "../../../common/config/logger";

const userRoutes=express.Router()

const userController=new UserController()
logger.info("Estado userEngine:"+""+JSON.stringify(userController))

userRoutes.post("", userController.registerUser)

export default userRoutes


