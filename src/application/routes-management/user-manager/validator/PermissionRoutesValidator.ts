import { body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';



export class PermissionRoutesValidator extends ParamsValidatorTemplate {
    getAllPermissionGroups(): ValidationChain[] {
        return [
            query('page').isInt({ min: 1 }).optional(),
            query('size').isInt({ min: 1 }).optional(),
            query('direction').isIn(['ASC', 'DESC']).optional(),
            query('orderColumn').isString().optional(),]
    }
    deletePermissionGroup(): ValidationChain[] {
        return []
    }
    updatePermissionGroup(): ValidationChain[] {
        return []
    }
    getPermissionGroupByCode(): ValidationChain[] {
        return [
            param('code').notEmpty().isLength({ max: 50 }).isString()]
    }
    createPermissionGroup(): ValidationChain[] {
        return [
            body('code').notEmpty().isLength({ max: 50 }).isString(),
            body('description').notEmpty().isLength({ max: 150 }).isString(),]
    }
    deletePermission(): ValidationChain[] {
        return []
    }
    getPermissionByCode(): ValidationChain[] {
        return [
            param('code').notEmpty().isLength({ max: 50 }).isString()
        ]
    }
    getAllPermissions(): ValidationChain[] {
        return [
            query('page').isInt({ min: 1 }).optional(),
            query('size').isInt({ min: 1 }).optional(),
            query('direction').isIn(['ASC', 'DESC']).optional(),
            query('orderColumn').isString().optional(),
            query('group').isLength({ max: 50 }).isString().optional(),
        ]
    }
    updatePermission(): ValidationChain[] {
        return []
    }
    createPermission(): ValidationChain[] {
        return [
            body('code').notEmpty().isLength({ max: 50 }).isString(),
            body('group').notEmpty().isLength({ max: 50 }).isString(),
            body('description').notEmpty().isLength({ max: 150 }).isString(),
        ]
    }


}