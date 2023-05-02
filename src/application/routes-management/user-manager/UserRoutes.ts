import * as express from "express";
import { UserController } from "../../controller/user-manager/UserController";


const UserRoutes = express.Router()

const userController = new UserController()
UserRoutes.post("/", userController.addUser)
UserRoutes.get("/", userController.getUsers)
UserRoutes.get("/:id", userController.getUserById)
UserRoutes.get("/username/:username", userController.getUserById)

export default UserRoutes


