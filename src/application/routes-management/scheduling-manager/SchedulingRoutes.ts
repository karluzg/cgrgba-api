import * as express from "express";

import { SchedulingRoutesValidator } from "./validator/scheduling/SchedulingRoutesValidator";
import { SchedulingController } from "../../controller/scheduling-manager/SchedulingController";

const schedulingRoutes = express.Router()

const schedulingController = new SchedulingController()
const schedulingValidator = new SchedulingRoutesValidator()
schedulingRoutes.post("/schedulings", schedulingValidator.addNewScheduling(), schedulingValidator.validate, schedulingController.add_new_scheduling)
schedulingRoutes.get("/schedulings", schedulingController.get_scheduling_list)
schedulingRoutes.get("/schedulings/:id", schedulingController.get_scheduling_detail)
schedulingRoutes.put("/schedulings/:id", schedulingController.update_scheduling)

export default schedulingRoutes

