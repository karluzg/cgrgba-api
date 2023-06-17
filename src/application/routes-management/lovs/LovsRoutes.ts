import * as express from "express";
import { LovsController } from "../../controller/lovs/LovsController";


const lovesRoutes = express.Router()

const lovsController = new LovsController()


lovesRoutes.get("/lovs/services", lovsController.get_service_by_category)
lovesRoutes.get("/lovs/roles", lovsController.get_roles)



export default lovesRoutes