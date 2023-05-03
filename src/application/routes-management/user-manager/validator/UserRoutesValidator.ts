import {  body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';



export class UserRoutesValidator extends ParamsValidatorTemplate {

    public addUser():ValidationChain[] {
        return [
            body('userFullName').notEmpty().isLength({ max:50}).isString(),
            body('userMobileNumber').isLength({ min: 9, max:21}).isString().optional(),
            body('userEmail').notEmpty().isLength({  max:34}).isEmail(),
        ]

    }

    public getUsers():ValidationChain[] {
        return [
            query('page').isInt({min: 1}).optional(),
            query('size').isInt({min: 1}).optional()
        ]

    }

    public getUserById():ValidationChain[] {
        return [
            param('id').notEmpty().isUUID(),
        ]

    }

    
}