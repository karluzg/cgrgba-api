import { Router } from "express";
import UserRoutes from "../user-manager/UserRoutes";
import SessionRoutes from "../user-manager/SessionRoutes";
import NewsRoutes from "../news-manager/NewsRoutes";
import schedulingTimeRoutes from "../scheduling-manager/schedulingTimeRoutes";
import schedulingRoutes from "../scheduling-manager/SchedulingRoutes";
import { UserResult } from "../../model/user-manager/UserResult";
import RoleRoutes from "../user-manager/RoleRoutes";
import PermissionRoutes from "../user-manager/PermissionRoutes";
import { PlataformConfig } from "../../../infrestructure/config/plataform";
import lovesRoutes from "../lovs/LovsRoutes";
import feedbackRoutes from "../feedback/FeedbackRoutes";

const sharedRoutes = Router();

const baseUrl = PlataformConfig.url.baseUrl

/* MODULES */

// USER-Manager
sharedRoutes.use(baseUrl, UserRoutes);
sharedRoutes.use(baseUrl , SessionRoutes);
sharedRoutes.use(baseUrl , RoleRoutes);
sharedRoutes.use(baseUrl , PermissionRoutes);

// News-Manager

sharedRoutes.use(baseUrl, NewsRoutes);


/* SCHEDULING-Manager*/
sharedRoutes.use(baseUrl, schedulingTimeRoutes);

sharedRoutes.use(baseUrl, schedulingRoutes)

/* LOVS */
sharedRoutes.use(baseUrl, lovesRoutes)

/* FEEDBACK */
sharedRoutes.use(baseUrl,feedbackRoutes)

export default sharedRoutes