import {ErrorRequestHandler, NextFunction,Request,Response} from 'express'
import { OperationExecption } from './OperatonException'
import { HttpCode } from '../response/HttpCode'
import logger from '../config/logger'


export const MiddllewareError = (error:Error & Partial<OperationExecption>,
    req:Request,  
    res:Response,
     next: NextFunction) => {

      logger.info("CARAMBA, O ERRO CHEGOU NO MIDDLEWARE ERROR")
   const statusCode = error.statusCode ?? HttpCode.INTERNAL_SERVER_ERROR
   const message= error.statusCode ? error.message : "Caiu no Erro Interno sem status"
    return res.status(statusCode).json({message})
}