import {  body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';



export class SessionRoutesValidator extends ParamsValidatorTemplate {

    public login():ValidationChain[] {
        return [
            body('userPassword').notEmpty().isLength({ min: 6, max:12}).isString(),
            body('userEmail').notEmpty().isLength({  max:34}).isEmail(),
        ]
    }
}