import * as express from "express";
import { SchedulingTimeController } from "../../controller/scheduling-manager/SchedulingTimeHourController";
import { SchedulingTimeRoutesValidator } from "./validator/schedulingTime/SchedulingTimeRoutesValidator";

const schedulingTimeRoutes = express.Router()


const schedulingTimeController = new SchedulingTimeController()
const schedulingTimeValidator = new SchedulingTimeRoutesValidator()
schedulingTimeRoutes.post("/slots", schedulingTimeValidator.addNewTimeSlot(), schedulingTimeValidator.validate, schedulingTimeController.add_new_time_slot)
schedulingTimeRoutes.get("/slots", schedulingTimeValidator.getTimeSlotList(), schedulingTimeValidator.validate, schedulingTimeController.get_time_slot_list)

export default schedulingTimeRoutes


