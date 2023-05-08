import * as express from "express";
import { SchedulingTimeController } from "../../controller/scheduling-manager/SchedulingTimeHourController";
import { UserRoutesValidator } from "../user-manager/validator/UserRoutesValidator";
import { SchedulingRoutesValidator } from "./validator/SchedulingRoutesValidator";

const schedulingtimeRoutes = express.Router()


const schedulingTimeHour = new SchedulingTimeController()
const schedulingTimeValidator = new SchedulingRoutesValidator()
schedulingtimeRoutes.post("", schedulingTimeValidator.addNewTimeSlot(), schedulingTimeValidator.validate, schedulingTimeHour.add_new_time_slot)

export default schedulingtimeRoutes


