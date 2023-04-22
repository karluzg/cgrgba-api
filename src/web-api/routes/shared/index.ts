import { Router } from "express";
import userRoutes from "../user-routes/routes";


const userIndexRouter=Router();

userIndexRouter.use("/users", userRoutes);

export default userIndexRouter