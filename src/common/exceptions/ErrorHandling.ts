import { NextFunction, Request, Response } from 'express'
import { OperationExecption } from './OperatonException'
import { HttpCode } from '../response/HttpCode'
import { MiddlewareCustomErrorMessage } from '../response/CustomErrorMessage'


export const MiddllewareError = (error: Error & Partial<OperationExecption>,
    req: Request,
    res: Response,
    next: NextFunction) => {
    const statusCode = error.statusCode ?? HttpCode.INTERNAL_SERVER_ERROR
    const message = error.statusCode ? error.message : MiddlewareCustomErrorMessage.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).json({ message })
}