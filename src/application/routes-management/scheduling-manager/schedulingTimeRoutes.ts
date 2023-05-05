import * as express from "express";
import { SchedulingTimeHourController } from "../../controller/scheduling-manager/SchedulingTimeHourController";

const schedulingtimeRoutes = express.Router()


const schedulingTimeHour = new SchedulingTimeHourController()
schedulingtimeRoutes.post("", schedulingTimeHour.add_new_time_slot)

export default schedulingtimeRoutes


