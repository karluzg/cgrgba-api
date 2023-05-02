import { Router } from "express";
import UserRoutes from "../user-manager/UserRoutes";
import schedulingtimeRoutes from "../scheduling-manager/schedulingTimeRoutes";

const sharedRoutes = Router();


/* MODULES */

// USER
sharedRoutes.use("/users", UserRoutes);



//SCHEDULING TIME HOUR
sharedRoutes.use("/slot", schedulingtimeRoutes);

export default sharedRoutes