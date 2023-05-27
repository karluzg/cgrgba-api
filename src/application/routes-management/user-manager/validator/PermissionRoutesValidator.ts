import { body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';



export class PermissionRoutesValidator extends ParamsValidatorTemplate {
    getAllPermissionGroups(): ValidationChain[] {
        return []
    }
    deletePermissionGroup(): ValidationChain[] {
        return []
    }
    updatePermissionGroup(): ValidationChain[] {
        return []
    }
    getPermissionGroupByCode(): ValidationChain[] {
        return []
    }
    createPermissionGroup(): ValidationChain[] {
        return []
    }
    deletePermission(): ValidationChain[] {
        return []
    }
    getPermissionByCode(): ValidationChain[] {
        return []
    }
    getPermissions(): ValidationChain[] {
        return []
    }
    updatePermission(): ValidationChain[] {
        return []
    }
    createPermission(): ValidationChain[] {
        return []
    }


    public addUser(): ValidationChain[] {
        return [
            body('fullName').notEmpty().isLength({ max: 50 }).isString(),
            body('mobileNumber').isLength({ min: 9, max: 21 }).isString().optional(),
            body('email').notEmpty().isLength({ max: 34 }).isEmail()
        ]

    }




}