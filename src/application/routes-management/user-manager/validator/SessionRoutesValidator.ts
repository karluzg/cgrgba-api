import {  body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';



export class SessionRoutesValidator extends ParamsValidatorTemplate {

    public login():ValidationChain[] {
        return [
            body('password').notEmpty().isLength({ min: 6, max:12}).isString(),
            body('email').notEmpty().isLength({ max: 34 }).isEmail()
        ]
    }
}