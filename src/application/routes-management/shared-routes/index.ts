import { Router } from "express";
import UserRoutes from "../user-manager/UserRoutes";
import SessionRoutes from "../user-manager/SessionRoutes";
import schedulingTimeRoutes from "../scheduling-manager/schedulingTimeRoutes";
import schedulingRoutes from "../scheduling-manager/SchedulingRoutes";

const sharedRoutes = Router();

const baseUrl = "/api/v1"

/* MODULES */

// USER-Manager
sharedRoutes.use(baseUrl, UserRoutes);
sharedRoutes.use(baseUrl + "/session", SessionRoutes);


/* SCHEDULING-Manager*/


sharedRoutes.use(baseUrl, schedulingTimeRoutes);

sharedRoutes.use(baseUrl, schedulingRoutes)


export default sharedRoutes