import { body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';



export class UserRoutesValidator extends ParamsValidatorTemplate {
    updatePassword(): ValidationChain[] {
        return [
            body('oldPassword').notEmpty().isLength({ min: 6, max: 12 }).isString(),
            body('newPassword').notEmpty().isLength({ min: 6, max: 12 }).isString(),
            body('confirmPassword').notEmpty().isLength({ min: 6, max: 12 }).isString(),]
    }
    resetPassword(): ValidationChain[] {
        return [
            body('mobileNumber').isLength({ min: 9, max: 21 }).isString().optional(),
            body('email').notEmpty().isLength({ max: 34 }).isEmail()
        ]
    }
    updateUser(): ValidationChain[] {
        return []
    }
    getUserByEmail(): ValidationChain[] {
        return []
    }

    public addUser(): ValidationChain[] {
        return [
            body('fullName').notEmpty().isLength({ max: 50 }).isString(),
            body('mobileNumber').isLength({ min: 9, max: 21 }).isString().optional(),
            body('email').notEmpty().isLength({ max: 34 }).isEmail()
        ]

    }

    public getUsers(): ValidationChain[] {
        return [
            query('page').isInt({ min: 1 }).optional(),
            query('size').isInt({ min: 1 }).optional()
        ]

    }

    public getUserById(): ValidationChain[] {
        return [
            param('id').notEmpty().isUUID(),
        ]

    }


}