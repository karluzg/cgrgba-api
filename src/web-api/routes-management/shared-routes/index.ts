import { Router } from "express";
import UserRoutes from "../user-manager/UserRoutes";
import schedulingtimeRoutes from "../scheduling-time/schedulingTimeRoutes";

const sharedRoutes = Router();


/* MODULES */

// USER
sharedRoutes.use("/users/create", UserRoutes);



//SCHEDULING TIME HOUR
sharedRoutes.use("/schedulingTimeHour/add", schedulingtimeRoutes);

export default sharedRoutes