import 'express-async-errors'
import express from "express";
import 'reflect-metadata'
import './infrestructure/config/injection'
import sharedRoutes from "./application/routes-management/shared-routes";
import logger from "./infrestructure/config/logger";
import { MiddllewareError } from './infrestructure/exceptions/ErrorHandling';
import { initNantoiUser } from './domain/meta-inf/InitNantoiUser';
import { PlataformConfig } from './infrestructure/config/plataform';
import cors from 'cors';

const swagger = require('./swagger');
const myDataSource = require('./domain/meta-inf/data-source');

// Configuração do Swagger




myDataSource.initialize().then(() => {

    // create and setup express app
    const app = express()

    var allowList = [ 
        'http://localhost:3001',
        'http://localhost:3002'
        ];


    var corsOptionsDelegate = (req, callback) => {

    var corsOptions;
    if (allowList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
        callback(null, corsOptions);
    }


    app.use(cors(corsOptionsDelegate));

    app.use(express.json())

    app.use(sharedRoutes)

    app.use(MiddllewareError)

    app.use('/'+PlataformConfig.server.uploadFolder, express.static(PlataformConfig.server.uploadFolder));

    swagger(app);

    app.listen(PlataformConfig.server.port);

    console.info("Data Source has been initialized!")
    logger.info("Data Source has been initialized!");

}).catch((error) => {
    logger.error("Error during Data Source initialization:" + "", error)
    console.error("Error during Data Source initialization:" + "", error)
}).finally(() => {
    initNantoiUser();
})


