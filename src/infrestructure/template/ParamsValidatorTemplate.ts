import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { InvalidParametersException } from "../exceptions/InvalidParametersException";
import { Field } from "../exceptions/enum/Field";
import { MiddlewareBusinessMessage } from "../response/enum/MiddlewareCustomErrorMessage";

export class ParamsValidatorTemplate {


    public  validate(request: Request, response: Response, next: NextFunction) {
        const errors = validationResult(request);

        if (errors.isEmpty()) {
            return next();
        }

        return next(new InvalidParametersException(Field.SYSTEM, MiddlewareBusinessMessage.INVALID_PARAMETERS,errors.array() ))
    }
}