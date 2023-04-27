import 'express-async-errors'
import * as express from "express";
import * as cors from 'cors'
import 'reflect-metadata'
import '../engine-container'
import sharedRoutes from "./routes-management/shared-routes";
import { myDataSource } from "./meta-inf/data-source";
import logger from "../common/config/logger";
import { MiddllewareError } from '../common/exceptions/ErrorHandling';


myDataSource.initialize().then(() =>{

// create and setup express app
const app = express()
app.use(cors())
app.use(express.json())


app.use(sharedRoutes)
app.use(MiddllewareError)
app.listen(3000)

console.info("Data Source has been initialized!") 
logger.info("Data Source has been initialized!") 

}).catch((error)=>{
    logger.error("Error during Data Source initialization:"+"", error)
})
