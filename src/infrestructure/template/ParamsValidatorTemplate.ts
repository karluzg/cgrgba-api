import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { InvalidParametersException } from "../exceptions/InvalidParametersException";
import { Field } from "../exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../response/enum/MiddlewareCustomMessage";

export class ParamsValidatorTemplate {


    public  validate(request: Request, response: Response, next: NextFunction) {
        const errors = validationResult(request);

        if (errors.isEmpty()) {
            return next();
        }

        return next(new InvalidParametersException(Field.USER, MiddlewareBusinessMessage.CORE_INVALID_PARAMETERS, errors.array()))
    }
}