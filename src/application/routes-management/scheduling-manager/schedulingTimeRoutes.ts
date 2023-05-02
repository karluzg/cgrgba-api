import * as express from "express";
import { SchedulingTimeHourController } from "../../controller/scheduling-manager/SchedulingTimeHourController";

const schedulingtimeRoutes = express.Router()


const schedulingTimeHour = new SchedulingTimeHourController()
schedulingtimeRoutes.post("", schedulingTimeHour.addNewTimeSlot)

export default schedulingtimeRoutes


