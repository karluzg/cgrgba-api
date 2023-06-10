import { body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';
import { MiddlewareBusinessMessage } from '../../../../infrestructure/response/enum/MiddlewareCustomMessage';



export class UserRoutesValidator extends ParamsValidatorTemplate {
    updatePassword(): ValidationChain[] {
        return [
            body('oldPassword').notEmpty().isLength({ min: 6, max: 12 }).isString(),
            body('newPassword').notEmpty().isLength({ min: 6, max: 12 }).isString(),
            body('confirmPassword').notEmpty().isLength({ min: 6, max: 12 }).isString(),]
    }
    resetPassword(): ValidationChain[] {
        return [
            body('mobileNumber').isLength({ min: 9, max: 21 }).isString().notEmpty(),
            body('email').notEmpty().isLength({ max: 34 }).isEmail()
        ]
    }
    updateUser(): ValidationChain[] {
        return []
    }
    
    getUserByEmail(): ValidationChain[] {
        return [
            param('email').notEmpty().isLength({ max: 34 }).isEmail(),
        ]
    }

    public addUser(): ValidationChain[] {
        return [
            body('fullName').isLength({ max: 50 }).isString().notEmpty().withMessage(MiddlewareBusinessMessage.USER_PARAM_FULL_NAME),
            body('mobileNumber').isLength({ min: 9, max: 21 }).isString().notEmpty().withMessage(MiddlewareBusinessMessage.USER_PARAM_MOBILE_NUMBER),
            body('email').notEmpty().isLength({ max: 34 }).isEmail().withMessage(MiddlewareBusinessMessage.USER_PARAM_EMAIL),
            body('roles').optional().isArray().notEmpty().withMessage(MiddlewareBusinessMessage.USER_PARAM_ROLES)
        ]
    }

    public getUsers(): ValidationChain[] {
        return [
            query('page').isInt({ min: 1 }).optional(),
            query('size').isInt({ min: 1 }).optional(),
            query('status').isLength({ max: 50 }).isString().optional(),
            query('direction').isIn(['ASC', 'DESC']).optional(),
            query('orderColumn').isString().optional(),
        ]

    }

    public getUserById(): ValidationChain[] {
        return [
            param('id').notEmpty().isInt(),
        ]

    }


}