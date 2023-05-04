import 'express-async-errors'
import express from "express";
import 'reflect-metadata'
import './infrestructure/config/injection'
import { Request, Response, NextFunction } from "express";
import sharedRoutes from "./application/routes-management/shared-routes";
//import { myDataSource } from "./meta-inf/data-source";
import logger from "./infrestructure/config/logger";
import { MiddllewareError } from './infrestructure/exceptions/ErrorHandling';
import { initNantoiUser } from './domain/meta-inf/InitNantoiUser';


const myDataSource = require('./domain/meta-inf/data-source');

myDataSource.initialize().then(() => {

    // create and setup express app
    const app = express()
    app.use(express.json())

    app.use(sharedRoutes)

    app.use(MiddllewareError)


    app.listen(3001)

    console.info("Data Source has been initialized!")
    logger.info("Data Source has been initialized!")

}).catch((error) => {
    logger.error("Error during Data Source initialization:" + "", error)
}).finally(()=>{
    initNantoiUser();
})
