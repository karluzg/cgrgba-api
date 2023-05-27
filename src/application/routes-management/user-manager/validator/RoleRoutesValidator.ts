import {  body, param, query, ValidationChain } from 'express-validator';
import { ParamsValidatorTemplate } from '../../../../infrestructure/template/ParamsValidatorTemplate';



export class RoleRoutesValidator extends ParamsValidatorTemplate {
    getRoleByName(): ValidationChain[] {
        return []
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
         return []
    }
    getRoleById():ValidationChain[] {
         return []
    }
    getAllRoles():ValidationChain[] {
     return [
          query('page').isInt({ min: 1 }).optional(),
          query('size').isInt({ min: 1 }).optional(),
          query('direction').isIn(['ASC', 'DESC']).optional(),
          query('orderColumn').isString().optional(),
      ]
    }


    public addUser():ValidationChain[] {
        return [
            body('fullName').notEmpty().isLength({ max:50}).isString(),
            body('mobileNumber').isLength({ min: 9, max:21}).isString().optional(),
            body('email').notEmpty().isLength({ max: 34 }).isEmail()
        ]

    }



    
}