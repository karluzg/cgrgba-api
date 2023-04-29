import * as express from "express";
import { UserController } from "../../controller/user-manager/UserController";

const UserRoutes = express.Router()

const userController = new UserController()
UserRoutes.post("", userController.registerUser)


export default UserRoutes


