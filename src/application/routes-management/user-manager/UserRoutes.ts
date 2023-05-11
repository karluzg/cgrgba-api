import * as express from "express";
import { UserController } from "../../controller/user-manager/UserController";
import { UserRoutesValidator } from "./validator/UserRoutesValidator";


const UserRoutes = express.Router()

const userController = new UserController()
const userRoutesValidator = new UserRoutesValidator()
UserRoutes.post("/users", userRoutesValidator.addUser(), userRoutesValidator.validate, userController.addUser)
UserRoutes.get("/users", userRoutesValidator.getUsers(), userRoutesValidator.validate, userController.getUsers)
UserRoutes.get("/users/:id", userRoutesValidator.getUserById(), userRoutesValidator.validate, userController.getUserById)
UserRoutes.get("/users/username/:username", userController.getUserById)

export default UserRoutes


