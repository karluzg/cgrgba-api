import { NextFunction, Request, Response } from 'express'
import { OperationExecption } from './OperatonException'
import { HttpCode } from '../response/enum/HttpCode'
import { MiddlewareCustomErrorMessage } from '../response/enum/MiddlewareCustomErrorMessage'
import logger from '../config/logger'
import { ResultInfo } from '../response/ResultInfo'

export const MiddllewareError = (error: Error & Partial<OperationExecption>,
    req: Request,
    res: Response,
    next: NextFunction) => {

    const statusCode = error.statusCode ?? HttpCode.INTERNAL_SERVER_ERROR

    const message = error.statusCode ? error.message : MiddlewareCustomErrorMessage.INTERNAL_SERVER_ERROR;

    const userErrorMessage: Map<string, ResultInfo> = new Map();

    userErrorMessage.set(error.field.toString(), new ResultInfo(message));

    let errorMessages = Object.fromEntries(userErrorMessage)

    return res.status(statusCode).json({ errorMessages })
}