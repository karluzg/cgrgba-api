import 'express-async-errors'
import express from "express";
import 'reflect-metadata'
import '../engine-container'
import { Request, Response, NextFunction } from "express";
import sharedRoutes from "./routes-management/shared-routes";
import schedulingtimeRoutes from './routes-management/scheduling-time/schedulingTimeRoutes';
//import { myDataSource } from "./meta-inf/data-source";
import logger from "../common/config/logger";
import { MiddllewareError } from '../common/exceptions/ErrorHandling';
const myDataSource = require('./meta-inf/data-source');

myDataSource.initialize().then(() => {

    // create and setup express app
    const app = express()
    app.use(express.json())

    app.use(sharedRoutes)
    app.use(schedulingtimeRoutes)

    app.use(MiddllewareError)


    app.listen(3000)

    console.info("Data Source has been initialized!")
    logger.info("Data Source has been initialized!")

}).catch((error) => {
    logger.error("Error during Data Source initialization:" + "", error)
})
