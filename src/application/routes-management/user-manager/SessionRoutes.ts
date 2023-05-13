import * as express from "express";
import { SessionController } from "../../controller/user-manager/SessionController";
import { SessionRoutesValidator } from "./validator/SessionRoutesValidator";


const SessionRoutes = express.Router()

const sessionController = new SessionController()
const sessionRoutesValidator = new SessionRoutesValidator()
SessionRoutes.post("/session/login", sessionRoutesValidator.login(),sessionRoutesValidator.validate, sessionController.login)


export default SessionRoutes
