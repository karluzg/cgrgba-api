import { Router } from "express";
import UserRoutes from "../user-manager/UserRoutes";
import SessionRoutes from "../user-manager/SessionRoutes";
import schedulingtimeRoutes from "../scheduling-manager/schedulingTimeRoutes";

const sharedRoutes = Router();


/* MODULES */

// USER-Manager
sharedRoutes.use("/users", UserRoutes);
sharedRoutes.use("/session", SessionRoutes);


//SCHEDULING-Manager
sharedRoutes.use("/slot", schedulingtimeRoutes);

export default sharedRoutes