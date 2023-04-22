import { Router } from "express";
import userRoutes from "../user-manager/UserRoutes";


const sharedRoutes=Router();

sharedRoutes.use("/users", userRoutes);

export default sharedRoutes