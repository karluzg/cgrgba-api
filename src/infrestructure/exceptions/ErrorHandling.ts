import { NextFunction, Request, Response } from 'express'
import { OperationExecption } from './OperatonException'
import { HttpCodes } from '../response/enum/HttpCode'
import { MiddlewareBusinessMessage } from '../response/enum/MiddlewareCustomMessage'
import { ResultInfo } from '../response/ResultInfo'

export const MiddllewareError = (error: Error & Partial<OperationExecption>,
    req: Request,
    res: Response,
    next: NextFunction) => {

    const statusCode = error.statusCode ?? HttpCodes.INTERNAL_SERVER_ERROR

    const errorMessage = error.statusCode ? error.message : MiddlewareBusinessMessage.CORE_INTERNAL_SERVER_ERROR;

    const details= error.details;

    const statusMap: Map<string, ResultInfo> = new Map();

    statusMap.set(error.field, new ResultInfo(errorMessage, details));

    let errorMessages = Object.fromEntries(statusMap)

    return res.status(statusCode).json({ errorMessages })
}