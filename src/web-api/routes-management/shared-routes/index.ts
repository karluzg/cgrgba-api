import { Router } from "express";
import userRoutes from "../user-manager/UserRoutes";


const sharedRoutes=Router();

sharedRoutes.use("/users/create", userRoutes);

export default sharedRoutes