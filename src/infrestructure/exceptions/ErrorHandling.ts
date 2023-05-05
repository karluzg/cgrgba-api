import { NextFunction, Request, Response } from 'express'
import { OperationExecption } from './OperatonException'
import { HttpCode } from '../response/enum/HttpCode'
import { MiddlewareBusinessMessage } from '../response/enum/MiddlewareCustomErrorMessage'
import logger from '../config/logger'
import { ResultInfo } from '../response/ResultInfo'

export const MiddllewareError = (error: Error & Partial<OperationExecption>,
    req: Request,
    res: Response,
    next: NextFunction) => {

    const statusCode = error.statusCode ?? HttpCode.INTERNAL_SERVER_ERROR

    const message = error.statusCode ? error.message : MiddlewareBusinessMessage.INTERNAL_SERVER_ERROR;

    const details= error.details;

    const userErrorMessage: Map<string, ResultInfo> = new Map();

    userErrorMessage.set(error.field, new ResultInfo(message, details));

    let errorMessages = Object.fromEntries(userErrorMessage)

    return res.status(statusCode).json({ errorMessages })
}