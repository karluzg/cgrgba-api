import { Router } from "express";
import UserRoutes from "../user-manager/UserRoutes";
import SessionRoutes from "../user-manager/SessionRoutes";
import NewsRoutes from "../news-manager/NewsRoutes";
import schedulingTimeRoutes from "../scheduling-manager/schedulingTimeRoutes";
import schedulingRoutes from "../scheduling-manager/SchedulingRoutes";
import { UserResult } from "../../model/user-manager/UserResult";

const sharedRoutes = Router();

const baseUrl = "/api/v1"

/* MODULES */

// USER-Manager
sharedRoutes.use(baseUrl, UserRoutes);
sharedRoutes.use(baseUrl , SessionRoutes);

// News-Manager

sharedRoutes.use(baseUrl, NewsRoutes);
/* SCHEDULING-Manager*/


sharedRoutes.use(baseUrl, schedulingTimeRoutes);

sharedRoutes.use(baseUrl, schedulingRoutes)


export default sharedRoutes