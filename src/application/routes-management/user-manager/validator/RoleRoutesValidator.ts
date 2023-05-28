import {  body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';



export class RoleRoutesValidator extends ParamsValidatorTemplate {
    getRoleByName(): ValidationChain[] {
        return [
          param('name').notEmpty().isLength({ max: 50 }).isString()
        ]
   }
    getPermissions():ValidationChain[] {
         return []
    }
    removePermissions():ValidationChain[] {
         return []
    }
    addPermissions():ValidationChain[] {
         return []
    }
    updateRole():ValidationChain[] {
         return []
    }
    createRole():ValidationChain[] {
     return [
          body('name').notEmpty().isLength({ max: 50 }).isString(),
          body('description').notEmpty().isLength({ max: 150 }).isString(),
          body('isAdmin').notEmpty().isBoolean(),
          body('permissions').optional().isArray().notEmpty().withMessage('O campo permissions deve ser um array não vazio de strings')
      ]
    }
    getRoleById():ValidationChain[] {
     return [
          param('id').notEmpty().isInt(),
      ]
    }
    getAllRoles():ValidationChain[] {
     return [
          query('page').isInt({ min: 1 }).optional(),
          query('size').isInt({ min: 1 }).optional(),
          query('direction').isIn(['ASC', 'DESC']).optional(),
          query('orderColumn').isString().optional(),
      ]
    }


    
}